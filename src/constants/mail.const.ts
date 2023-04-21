import { getEnv } from "src/shared/get_config";

export const mail_config = {
    service: getEnv('EMAIL_SERVICE'),
    host: getEnv('EMAIL_HOST'),
    port: Number(getEnv('EMAIL_PORT')),
    user: getEnv('EMAIL_USER'),
    password: getEnv('EMAIL_PASSWORD'),
    sender: getEnv('EMAIL_SENDER')
}