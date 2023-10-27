import { Sequelize } from 'sequelize-typescript';
import { Department } from '../departments/entities/department.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Location } from '../departments/entities/location.entity';
import { Country } from '../departments/entities/country.entity';
import { Region } from '../departments/entities/region.entity';
import { Job } from '../employees/entities/job.entity';
import { JobHistory } from '../employees/entities/jobhistory.entity';
import configDatabase from '../config/config.database';

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
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
