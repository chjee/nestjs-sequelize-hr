import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model<RefreshToken> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER.UNSIGNED)
  user_id: number;

  @Unique
  @Column(DataType.STRING(255))
  token: string;

  @Column(DataType.DATE)
  expires_at: Date;
}
