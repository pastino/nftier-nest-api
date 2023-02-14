import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: __dirname + '/../../.env.dev' });
} else if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: __dirname + '/../../.env.prod' });
} else if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: __dirname + '/../../.env.dev' });
} else {
  dotenv.config({ path: __dirname + '/../../.env.local' });
}
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  charset: 'utf8mb4',
  migrations: [__dirname + '/../../src/migrations/*.ts'],
});

export default AppDataSource;
