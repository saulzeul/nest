import { TypeOrmModule } from "@nestjs/typeorm";
import { primary_db } from "../../constants/database.const";

const { host, user, password, port, db_name } = primary_db;

export const default_db = [
    TypeOrmModule.forRootAsync({
        name: 'default',
        async useFactory() {
            return {
                name: 'default',
                type: 'mssql' as 'mssql',
                host: host,
                username: user,
                password: password,
                port: port,
                database: db_name,
                entities: [__dirname + '/../../**/*.entity.{js,ts}'],
                options: {
                    enableArithAbort: true,
                    encrypt: false,
                    trustServerCertificate: true
                },
                synchronize: false,
                migrationsRun: true,
                logging: false,
                logger: 'file',
                migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
                cli: {
                    migrationsDir: 'src/database/migrations',
                },
            }
        }
    })
]