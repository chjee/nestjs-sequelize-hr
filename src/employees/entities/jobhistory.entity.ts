import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Employee } from './employee.entity';
import { Job } from './job.entity';
import { Department } from '../../departments/entities/department.entity';

@Table({ tableName: 'job_history' })
export class JobHistory extends Model<JobHistory> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  @ForeignKey(() => Employee)
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
  @Column(DataType.STRING(10))
  @ForeignKey(() => Job)
  job_id: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  @ForeignKey(() => Department)
  department_id: number;
}
