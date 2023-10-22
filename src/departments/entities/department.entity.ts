import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment,
  DataType,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'departments' })
export class Department extends Model<Department> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  department_id: number;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(30))
  department_name: string;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT.UNSIGNED)
  manager_id?: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.BIGINT.UNSIGNED)
  location_id?: number;
}
