import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.changeColumn('employees', 'email', {
    type: DataTypes.STRING(255),
    allowNull: false,
  });
};

export const down = async ({ context: qi }) => {
  await qi.changeColumn('employees', 'email', {
    type: DataTypes.STRING(25),
    allowNull: false,
  });
};
