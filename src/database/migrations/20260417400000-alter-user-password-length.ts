import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.changeColumn('users', 'password', {
    type: DataTypes.STRING(255),
    allowNull: false,
  });
};

export const down = async ({ context: qi }) => {
  await qi.changeColumn('users', 'password', {
    type: DataTypes.STRING(100),
    allowNull: false,
  });
};
