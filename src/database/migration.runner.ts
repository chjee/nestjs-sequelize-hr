import * as fs from 'fs/promises';
import { Sequelize } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';
import * as path from 'path';

type Migration = {
  up: (params: { context: QueryInterface }) => Promise<void>;
};

async function getExecutedMigrations(
  sequelize: Sequelize,
): Promise<Set<string>> {
  await sequelize.query(
    'CREATE TABLE IF NOT EXISTS SequelizeMeta (name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)',
  );
  const [rows] = await sequelize.query('SELECT name FROM SequelizeMeta');
  return new Set((rows as { name: string }[]).map((r) => r.name));
}

async function logMigration(sequelize: Sequelize, name: string): Promise<void> {
  await sequelize.query('INSERT INTO SequelizeMeta (name) VALUES (?)', {
    replacements: [name],
  });
}

export async function runMigrations(sequelize: Sequelize): Promise<void> {
  const migrationsDir = path.join(__dirname, 'migrations');
  const migrationFiles = (await fs.readdir(migrationsDir))
    .filter((file) => /\.(ts|js)$/.test(file) && !file.endsWith('.d.ts'))
    .sort();
  const executedMigrations = await getExecutedMigrations(sequelize);
  const queryInterface = sequelize.getQueryInterface();

  for (const file of migrationFiles) {
    const migrationName = file.replace(/\.(ts|js)$/, '');
    if (
      executedMigrations.has(migrationName) ||
      executedMigrations.has(`${migrationName}.ts`) ||
      executedMigrations.has(`${migrationName}.js`)
    ) {
      continue;
    }

    const migration = (await import(
      path.join(migrationsDir, file)
    )) as Migration;
    await migration.up({ context: queryInterface });
    await logMigration(sequelize, migrationName);
    console.info({ event: 'migrated', name: migrationName });
  }
}
