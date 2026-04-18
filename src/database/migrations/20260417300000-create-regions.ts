import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('regions', {
    region_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    region_name: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('regions');
};
