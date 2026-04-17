import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService, TokenResponse } from './auth.service';
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

  @UseGuards(ThrottlerGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login API', description: 'User login' })
  @ApiBody({ type: SignInUserDto })
  @ApiCreatedResponse({
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refresh_token: 'a1b2c3d4e5f6...',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<TokenResponse> {
    return this.authService.signIn(signInUserDto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Token Refresh API', description: 'Issue new access token using refresh token' })
  @ApiBody({ schema: { example: { refresh_token: 'a1b2c3d4e5f6...' } } })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async refresh(@Body('refresh_token') token: string): Promise<{ access_token: string }> {
    return this.authService.refresh(token);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'User Logout API', description: 'Invalidate refresh token' })
  @ApiBody({ schema: { example: { refresh_token: 'a1b2c3d4e5f6...' } } })
  async logout(@Body('refresh_token') token: string): Promise<void> {
    return this.authService.logout(token);
  }

  @ApiBearerAuth('access_token')
  @Get('profile')
  @ApiOperation({ summary: 'User Profile API', description: 'Get user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
