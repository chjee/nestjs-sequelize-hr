import { Sequelize } from 'sequelize-typescript';
import { Department } from '../departments/entities/department.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Location } from '../departments/entities/location.entity';
import { Country } from '../departments/entities/country.entity';
import { Region } from '../departments/entities/region.entity';
import { Job } from '../employees/entities/job.entity';
import { JobHistory } from '../employees/entities/jobhistory.entity';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { AuditLog } from '../audit/audit-log.entity';
import configDatabase from '../config/config.database';
import { runMigrations } from './migration.runner';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(configDatabase());
      sequelize.addModels([
        Department,
        Employee,
        Location,
        Country,
        Region,
        Job,
        JobHistory,
        User,
        RefreshToken,
        AuditLog,
      ]);
      if (process.env.DB_SYNC === 'true') {
        await sequelize.sync();
      }
      if (process.env.DB_MIGRATE === 'true') {
        await runMigrations(sequelize);
      }
      return sequelize;
    },
  },
];
