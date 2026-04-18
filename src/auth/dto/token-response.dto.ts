import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly access_token!: string;

  @ApiProperty({
    description:
      'Refresh token. Store the latest value returned by login or refresh.',
    example: 'a1b2c3d4e5f6...',
  })
  readonly refresh_token!: string;
}
