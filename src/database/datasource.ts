import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
config();
 
const configService = new ConfigService();
 
export const AppDataSource = new DataSource({
  type: 'mssql',
  host: configService.get('PRIMARY_DB_HOST'),
  port: Number(configService.get('PRIMARY_DB_PORT')),
  username: configService.get('PRIMARY_DB_USER'),
  password: configService.get('PRIMARY_DB_PASSWORD'),
  database: configService.get('PRIMARY_DB_NAME'),
  entities: ['src/models/**/!(exclude-entity)/*.entity{.ts,.js}'],
  options: {
    enableArithAbort: true,
    encrypt: false,
  },
  synchronize: true,
  migrationsRun: true,
  logging: true,
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
});