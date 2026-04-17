import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

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

  @ApiProperty({ example: 'password123', minLength: 5, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly password: string;
}
