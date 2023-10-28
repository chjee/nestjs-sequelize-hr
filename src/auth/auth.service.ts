import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserDto: SignInUserDto): Promise<any> {
    const user = await this.usersService.findOne(signInUserDto.userid);
    if (user?.password !== signInUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userid, userName: user.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
