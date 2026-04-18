import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Region } from './region.entity';

@Table({ tableName: 'countries', timestamps: true })
export class Country extends Model<Country> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(2))
  country_id: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(40))
  country_name?: string;

  @AllowNull(false)
  @ForeignKey(() => Region)
  @Column(DataType.BIGINT.UNSIGNED)
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;
}
