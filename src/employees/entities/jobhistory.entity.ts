import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from './employee.entity';
import { Job } from './job.entity';
import { Department } from '../../departments/entities/department.entity';

@Table({ tableName: 'job_history' })
export class JobHistory extends Model<JobHistory> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT.UNSIGNED)
  employee_id: number;

  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  start_date: Date;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  end_date: Date;

  @Comment('')
  @AllowNull(false)
  @ForeignKey(() => Job)
  @Column(DataType.STRING(10))
  job_id: string;

  @Comment('')
  @AllowNull(false)
  @ForeignKey(() => Department)
  @Column(DataType.BIGINT.UNSIGNED)
  department_id: number;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BelongsTo(() => Job)
  job: Job;

  @BelongsTo(() => Department)
  department: Department;
}
