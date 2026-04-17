import * as fs from 'fs/promises';
import { Sequelize } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';
import { SequelizeStorage } from 'umzug/lib/storage/sequelize';
import * as path from 'path';

type Migration = {
  up: (params: { context: QueryInterface }) => Promise<void>;
};

export async function runMigrations(sequelize: Sequelize): Promise<void> {
  const migrationsDir = path.join(__dirname, 'migrations');
  const migrationFiles = (await fs.readdir(migrationsDir))
    .filter((file) => /\.(ts|js)$/.test(file) && !file.endsWith('.d.ts'))
    .sort();
  const storage = new SequelizeStorage({ sequelize });
  const executedMigrations = new Set(await storage.executed());
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
    await storage.logMigration({ name: migrationName });
    console.info({ event: 'migrated', name: migrationName });
  }
}
