import { getEnv } from "../shared/get_config";

export const primary_db = {
    host: getEnv('PRIMARY_DB_HOST'),
    port: Number(getEnv('PRIMARY_DB_PORT')),
    user: getEnv('PRIMARY_DB_USER'),
    password: getEnv('PRIMARY_DB_PASSWORD'),
    db_name: getEnv('PRIMARY_DB_NAME')
}

export const env_secondary_db = {
    name: getEnv('SECONDARY_DB_NAME')
}