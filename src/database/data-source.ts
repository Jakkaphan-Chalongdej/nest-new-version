import { join } from 'path';
import { DataSource } from 'typeorm';

const devDataSource = new DataSource({
  type: (process.env.DB_DIALECT as any) || 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join('dist', 'database', 'entities', '*.entity{.ts,.js}')],
  migrations: [join('migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  logging: ['warn', 'error'],
  synchronize: false,
});

export default devDataSource;
