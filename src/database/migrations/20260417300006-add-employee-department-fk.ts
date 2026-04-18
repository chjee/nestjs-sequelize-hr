export const up = async ({ context: qi }) => {
  await qi.addConstraint('employees', {
    fields: ['department_id'],
    type: 'foreign key',
    name: 'fk_employees_department_id',
    references: { table: 'departments', field: 'department_id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
};

export const down = async ({ context: qi }) => {
  await qi.removeConstraint('employees', 'fk_employees_department_id');
};
