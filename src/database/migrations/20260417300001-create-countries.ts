import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('countries', {
    country_id: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    region_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'regions', key: 'region_id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('countries');
};
