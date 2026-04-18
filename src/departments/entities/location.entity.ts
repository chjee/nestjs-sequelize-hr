import {
  Model,
  Table,
  Column,
  AllowNull,
  AutoIncrement,
  Default,
  PrimaryKey,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Country } from './country.entity';

@Table({ tableName: 'locations', timestamps: true })
export class Location extends Model<Location> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  location_id: number;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(40))
  street_address?: string;

  @AllowNull(true)
  @Column(DataType.STRING(12))
  postal_code?: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  city: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(25))
  state_province?: string;

  @AllowNull(false)
  @ForeignKey(() => Country)
  @Column(DataType.STRING(2))
  country_id: string;

  @BelongsTo(() => Country)
  country: Country;
}
