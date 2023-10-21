import { Sequelize } from 'sequelize-typescript';
// import { Cat } from '../cats/cat.entity';

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
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
