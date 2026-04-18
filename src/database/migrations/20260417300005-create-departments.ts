import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('departments', {
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    department_name: { type: DataTypes.STRING(30), allowNull: false },
    manager_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: { model: 'employees', key: 'employee_id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    location_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: { model: 'locations', key: 'location_id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('departments');
};
