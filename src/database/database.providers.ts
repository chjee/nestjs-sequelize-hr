import { Sequelize } from 'sequelize-typescript';
import { Department } from '../departments/entities/department.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'echonrich',
        password: 'echonrich0928',
        database: 'hr',
        define: {
          timestamps: false,
        },
      });
      sequelize.addModels([Department]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
