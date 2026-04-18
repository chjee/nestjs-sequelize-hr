import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('job_history', {
    employee_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: { model: 'employees', key: 'employee_id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    start_date: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false,
    },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    job_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'jobs', key: 'job_id' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'departments', key: 'department_id' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('job_history');
};
