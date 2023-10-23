import {
  Model,
  Table,
  Column,
  AllowNull,
  AutoIncrement,
  Default,
  PrimaryKey,
  Comment,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Country } from './country.entity';

@Table({ tableName: 'locations' })
export class Location extends Model<Location> {
  @PrimaryKey
  @AutoIncrement
  @Comment('')
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  location_id: number;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(40))
  street_address?: string;

  @Comment('')
  @AllowNull(true)
  @Column(DataType.STRING(12))
  postal_code?: string;

  @Comment('')
  @AllowNull(false)
  @Column(DataType.STRING(30))
  city: string;

  @Comment('')
  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(25))
  state_province?: string;

  @Comment('')
  @AllowNull(false)
  @ForeignKey(() => Country)
  @Column(DataType.STRING(2))
  country_id: string;
}
