import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Department ID',
    example: 11,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly department_id: number;

  @ApiProperty({
    description: 'Department Name',
    example: 'Holding',
    minLength: 2,
    maxLength: 30,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  readonly department_name: string;

  @ApiProperty({
    description: 'Manager ID',
    example: 200,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  readonly manager_id: number;

  @ApiProperty({
    description: 'Location ID',
    example: 1700,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  readonly location_id: number;
}
