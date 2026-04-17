import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'audit_logs' })
export class AuditLog extends Model {
  @Column({ type: DataType.STRING(50), allowNull: true })
  user_id: string;

  @Column({ type: DataType.STRING(10), allowNull: false })
  method: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  path: string;

  @Column({ type: DataType.STRING(36), allowNull: true })
  request_id: string;

  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false })
  status_code: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  request_body: string;
}
