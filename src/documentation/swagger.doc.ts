import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
    SWAGGER_API_ROOT,
    SWAGGER_API_NAME,
    SWAGGER_API_DESCRIPTION,
    SWAGGER_API_CURRENT_VERSION,
} from '../constants/swagger.const';

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

}