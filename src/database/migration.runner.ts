import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import * as path from 'path';

export async function runMigrations(sequelize: Sequelize): Promise<void> {
  const umzug = new Umzug({
    migrations: {
      glob: path.join(__dirname, 'migrations/*.{ts,js}'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
}
