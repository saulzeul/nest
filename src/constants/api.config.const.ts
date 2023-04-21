import { getEnv } from "src/shared/get_config";

export const api_config = {
    port: getEnv('API_PORT'),
    storage: getEnv('STORAGE_FOLDER')
}