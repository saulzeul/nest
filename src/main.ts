import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { api_config } from './constants/api.config.const';
import { setupSwagger } from './documentation/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(api_config.port);
}
bootstrap();
