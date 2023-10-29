import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  @ApiProperty({
    description: 'User ID',
    example: 'admin',
    minLength: 5,
    maxLength: 20,
  })
  readonly userid!: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 12)
  @ApiProperty({
    description: 'User Password',
    example: 'whoami',
    minLength: 5,
    maxLength: 12,
  })
  readonly password!: string;
}
