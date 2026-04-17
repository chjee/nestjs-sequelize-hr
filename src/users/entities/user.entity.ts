import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id: number;

  @Unique
  @Column(DataType.STRING(20))
  userid: string;

  @Column(DataType.STRING(50))
  username: string;

  @Column(DataType.STRING(100))
  password: string;
}
