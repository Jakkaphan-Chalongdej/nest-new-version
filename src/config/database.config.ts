import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default () =>
  ({
    type: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'yim',
    logging: process.env.DB_LOGGING === 'true',
    entities: [
      join(__dirname, '..', 'database', 'entities', '*.entity{.ts,.js}'),
    ],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
    cli: {
      migrationsDir: join(__dirname, 'migrations'),
    },
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
  } as TypeOrmModuleOptions);
