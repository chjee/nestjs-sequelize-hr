import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'jsmith', minLength: 5, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly userid: string;

  @ApiProperty({ example: 'John Smith', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  readonly username: string;

  @ApiProperty({
    example: 'P@ssword1',
    minLength: 8,
    maxLength: 20,
    description: 'Must contain uppercase letter, number, and special character',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message: 'password must contain at least one uppercase letter, one number, and one special character (@$!%*?&)',
  })
  readonly password: string;
}
