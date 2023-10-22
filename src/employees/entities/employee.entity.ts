import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  Comment,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Department } from '../../departments/entities/department.entity';
import { Job } from './job.entity';

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  employee_id: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(20))
  first_name?: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(25))
  last_name: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(25))
  email: string;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(20))
  phone_number?: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  hire_date: Date;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(10))
  @ForeignKey(() => Job)
  job_id: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.DECIMAL(8, 2))
  salary: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.DECIMAL(2, 2))
  commission_pct?: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT.UNSIGNED)
  @ForeignKey(() => Employee)
  manager_id?: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT.UNSIGNED)
  @ForeignKey(() => Department)
  department_id?: number;
}
