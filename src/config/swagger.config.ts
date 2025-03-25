import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SwaggerConfig = (app: any, path: string): void => {
  const config = new DocumentBuilder()
    .setTitle('LLM - REST APIs')
    .setDescription('The LLM API description')
    .setVersion('1.0.0')
    .addBearerAuth(swaggerAuthConfig(), "Authorization")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document);
};

export const swaggerAuthConfig = (): SecuritySchemeObject => {
  return {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "Authorization",
    description: "JWT Authorization header using the Bearer scheme",
    in: "header"
  }
}