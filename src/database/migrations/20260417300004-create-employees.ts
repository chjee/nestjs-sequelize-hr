import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('employees', {
    employee_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    last_name: { type: DataTypes.STRING(25), allowNull: false },
    email: { type: DataTypes.STRING(25), allowNull: false },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    hire_date: { type: DataTypes.DATEONLY, allowNull: false },
    job_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'jobs', key: 'job_id' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    salary: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    commission_pct: {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: true,
      defaultValue: null,
    },
    manager_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: { model: 'employees', key: 'employee_id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    department_id: {
      // FK to departments added after that table is created
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('employees');
};
