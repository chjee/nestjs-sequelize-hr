import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  Comment,
} from 'sequelize-typescript';

@Table({ tableName: 'regions' })
export class Region extends Model<Region> {
  @Column
  @Comment('')
  @AllowNull(false)
  @PrimaryKey
  region_id: number;

  @Column
  @Comment('')
  @AllowNull(true)
  @Default(null)
  region_name?: string;
}
