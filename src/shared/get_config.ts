import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();
 
const configService = new ConfigService();

export const getEnv = (env: string) => {
    return configService.get(env);
}
