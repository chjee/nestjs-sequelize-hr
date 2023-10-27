import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly userid: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 12)
  readonly password: string;
}
