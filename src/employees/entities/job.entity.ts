import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'jobs', timestamps: true })
export class Job extends Model<Job> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(10))
  job_id: string;

  @AllowNull(false)
  @Column(DataType.STRING(35))
  job_title: string;

  @AllowNull(true)
  @Column(DataType.DECIMAL(8, 0))
  min_salary?: number;

  @AllowNull(true)
  @Column(DataType.DECIMAL(8, 0))
  max_salary?: number;
}
