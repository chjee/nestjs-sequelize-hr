import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Employee ID',
    example: 207,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly employee_id: number;

  @ApiProperty({
    description: 'First Name',
    example: 'Steven',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @Length(2, 20)
  readonly first_name?: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'King',
    minLength: 2,
    maxLength: 25,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  readonly last_name: string;

  @ApiProperty({
    description: 'Email',
    example: 'nobody@gmail.com',
    minLength: 2,
    maxLength: 25,
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(2, 25)
  readonly email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '515.123.4567',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @Length(2, 20)
  readonly phone_number?: string;

  @ApiProperty({
    description: 'Hire Date',
    example: '2003-06-17',
  })
  @IsNotEmpty()
  @IsString()
  readonly hire_date: Date;

  @ApiProperty({
    description: 'Job ID',
    example: 'IT_PROG',
    minLength: 2,
    maxLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  readonly job_id: string;

  @ApiProperty({
    description: 'Salary',
    example: 24000,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;

  @ApiProperty({
    description: 'Commission PCT',
    example: 0.2,
    minimum: 0,
  })
  @IsNumber()
  readonly commission_pct?: number;

  @ApiProperty({
    description: 'Manager ID',
    example: 103,
    minimum: 0,
  })
  @IsNumber()
  readonly manager_id?: number;

  @ApiProperty({
    description: 'Department ID',
    example: 60,
    minimum: 0,
  })
  @IsNumber()
  readonly department_id?: number;
}
