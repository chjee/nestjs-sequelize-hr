import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'admin',
    minLength: 5,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly userid!: string;

  @ApiProperty({
    description: 'User Password',
    example: 'whoami',
    minLength: 5,
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 12)
  readonly password!: string;
}
