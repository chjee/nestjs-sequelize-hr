import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { Public } from './decorators/public.decorator';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('User Authentication API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User Login API',
    description: 'User login',
  })
  @ApiBody({ type: SignInUserDto })
  @ApiCreatedResponse({
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi...',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<any> {
    return this.authService.signIn(signInUserDto);
  }

  @ApiBearerAuth('access_token')
  @Get('profile')
  @ApiOperation({
    summary: 'User Profile API',
    description: 'Get user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
