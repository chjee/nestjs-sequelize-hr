import { DataTypes } from 'sequelize';

export const up = async ({ context: qi }) => {
  await qi.createTable('jobs', {
    job_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    job_title: { type: DataTypes.STRING(35), allowNull: false },
    min_salary: { type: DataTypes.DECIMAL(8, 0), allowNull: true },
    max_salary: { type: DataTypes.DECIMAL(8, 0), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down = async ({ context: qi }) => {
  await qi.dropTable('jobs');
};
