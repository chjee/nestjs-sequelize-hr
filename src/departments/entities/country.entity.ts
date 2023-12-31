import {
  Model,
  Table,
  Column,
  AllowNull,
  Default,
  PrimaryKey,
  Comment,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Region } from './region.entity';

@Table({ tableName: 'countries' })
export class Country extends Model<Country> {
  @PrimaryKey
  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(2))
  country_id: string;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(40))
  country_name?: string;

  @Comment('')
  @AllowNull(false)
  @ForeignKey(() => Region)
  @Column(DataType.BIGINT.UNSIGNED)
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;
}
