import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';
import { Location } from './location.entity';

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
  @ForeignKey(() => Employee)
  @Column(DataType.BIGINT.UNSIGNED)
  manager_id?: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @ForeignKey(() => Location)
  @Column(DataType.BIGINT.UNSIGNED)
  location_id?: number;

  @BelongsTo(() => Employee)
  manager: Employee;

  @BelongsTo(() => Location)
  location: Location;
}
