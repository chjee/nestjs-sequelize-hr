export const up = async ({ context: qi }) => {
  await qi.addIndex('employees', ['department_id']);
  await qi.addIndex('employees', ['manager_id']);
  await qi.addIndex('departments', ['location_id']);
};

export const down = async ({ context: qi }) => {
  await qi.removeIndex('employees', ['department_id']);
  await qi.removeIndex('employees', ['manager_id']);
  await qi.removeIndex('departments', ['location_id']);
};
