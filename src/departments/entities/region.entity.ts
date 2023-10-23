import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  Comment,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'regions' })
export class Region extends Model<Region> {
  @Comment('')
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  region_id: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(25))
  region_name?: string;
}
