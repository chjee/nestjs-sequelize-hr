import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'jobs' })
export class Job extends Model<Job> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(10))
  job_id: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(35))
  job_title: string;

  @Comment('')
  @AllowNull(true)
  @Column(DataType.DECIMAL(8, 0))
  min_salary?: number;

  @Comment('')
  @AllowNull(true)
  @Column(DataType.DECIMAL(8, 0))
  max_salary?: number;
}
