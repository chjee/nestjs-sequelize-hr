import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly employee_id: number;

  @IsString()
  @Length(2, 20)
  readonly first_name?: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(2, 25)
  readonly email: string;

  @IsString()
  @Length(2, 20)
  readonly phone_number?: string;

  @IsNotEmpty()
  @IsString()
  readonly hire_date: Date;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  readonly job_id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;

  @IsNumber()
  readonly commission_pct?: number;

  @IsNumber()
  readonly manager_id?: number;

  @IsNumber()
  readonly department_id?: number;
}
