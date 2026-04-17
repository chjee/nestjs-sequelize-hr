import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  private readonly refreshTokenTtlMs: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('REFRESH_TOKEN_REPOSITORY')
    private readonly refreshTokenRepository: typeof RefreshToken,
  ) {
    const ttlDays = this.configService.get<number>('REFRESH_TOKEN_TTL_DAYS', 7);
    this.refreshTokenTtlMs = ttlDays * 24 * 60 * 60 * 1000;
  }

  async signIn(signInUserDto: SignInUserDto): Promise<TokenResponse> {
    const user = await this.usersService.findOne(signInUserDto.userid);
    if (!user || !(await bcrypt.compare(signInUserDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userid, userName: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.createRefreshToken(user.id);
    return { access_token, refresh_token };
  }

  async refresh(token: string): Promise<{ access_token: string }> {
    const tokenHash = this.hashToken(token);
    const record = await this.refreshTokenRepository.findOne({ where: { token: tokenHash } });
    if (!record || record.expires_at < new Date()) {
      if (record) await record.destroy();
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    const user = await this.usersService.findById(record.user_id);
    const payload = { userId: user.userid, userName: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async logout(token: string): Promise<void> {
    const tokenHash = this.hashToken(token);
    await this.refreshTokenRepository.destroy({ where: { token: tokenHash } });
  }

  private async createRefreshToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(token);
    const expires_at = new Date(Date.now() + this.refreshTokenTtlMs);
    await this.refreshTokenRepository.create({ user_id: userId, token: tokenHash, expires_at } as RefreshToken);
    return token;
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
