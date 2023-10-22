import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly department_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  readonly department_name: string;

  @IsNumber()
  @Min(0)
  readonly manager_id: number;

  @IsNumber()
  @Min(0)
  readonly location_id: number;
}
