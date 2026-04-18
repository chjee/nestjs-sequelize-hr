import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.changeColumn('audit_logs', 'user_id', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });
};

export const down = async ({ context: qi }) => {
  await qi.changeColumn('audit_logs', 'user_id', {
    type: DataTypes.STRING(50),
    allowNull: true,
  });
};
