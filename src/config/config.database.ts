import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize/types';

export default registerAs('database', () => ({
  dialect: 'mysql' as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  pool: {
    max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 5,
    min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN, 10) : 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.DB_LOGGING === 'true' ? true : false,
  define: {
    timestamps: false,
  },
}));
