import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { UsersService } from '../users/users.service';

export interface SignInResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserDto: SignInUserDto): Promise<SignInResponse> {
    const user = await this.usersService.findOne(signInUserDto.userid);
    if (!user || !(await bcrypt.compare(signInUserDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userid, userName: user.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
