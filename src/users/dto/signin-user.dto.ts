import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

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
    example: 'P@ssword1',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message:
      'password must contain at least one uppercase letter, one number, and one special character (@$!%*?&)',
  })
  readonly password!: string;
}
