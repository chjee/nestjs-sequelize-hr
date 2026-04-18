import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('locations', {
    location_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    postal_code: { type: DataTypes.STRING(12), allowNull: true },
    city: { type: DataTypes.STRING(30), allowNull: false },
    state_province: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null,
    },
    country_id: {
      type: DataTypes.STRING(2),
      allowNull: false,
      references: { model: 'countries', key: 'country_id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('locations');
};
