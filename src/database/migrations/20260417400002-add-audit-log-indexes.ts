const addIndexIfNotExists = async (qi, table: string, columns: string[]) => {
  try {
    await qi.addIndex(table, columns);
  } catch (e: any) {
    if (!e.message?.includes('Duplicate key name')) throw e;
  }
};

export const up = async ({ context: qi }) => {
  await addIndexIfNotExists(qi, 'audit_logs', ['user_id']);
  await addIndexIfNotExists(qi, 'audit_logs', ['createdAt']);
};

export const down = async ({ context: qi }) => {
  await qi.removeIndex('audit_logs', ['createdAt']);
  await qi.removeIndex('audit_logs', ['user_id']);
};
