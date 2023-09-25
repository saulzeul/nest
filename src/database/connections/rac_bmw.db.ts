import { TypeOrmModule } from "@nestjs/typeorm"
import { env_secondary_db, primary_db } from "../../constants/database.const"

const { host, user, password, port } = primary_db;
const { name } = env_secondary_db;

export const secondary_db = [
    TypeOrmModule.forRootAsync({
        name: name,
        async useFactory() {
            return {
                name: name,
                type: 'mssql' as 'mssql',
                host: host,
                username: user,
                password: password,
                port: port,
                database: name,
                entities: [__dirname + '/../../**/*.exclude-entity{.ts,.js}'],
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