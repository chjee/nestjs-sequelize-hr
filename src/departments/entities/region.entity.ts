import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'regions' })
export class Region extends Model<Region> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  region_id: number;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(25))
  region_name?: string;
}
