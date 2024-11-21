import { bold } from 'chalk';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './config/swagger.config';
import { LoggerService } from './modules/logger/logger.service';
import { NotFoundExceptionFilter } from './config/exceptions/not_found_exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create<INestApplication>(AppModule, {
      abortOnError: false,
    });

    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    const port: number = configService.get<number>('app_port');
    const mode: string = configService.get<string>('app_mode');
    const docPath: string = configService.get<string>('doc_path');

    SwaggerConfig(app, docPath);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const logger = app.get(LoggerService);
    app.useGlobalFilters(new NotFoundExceptionFilter(logger));

    await app.listen(port, () => {
      const runningMode = `Server running in ${bold(mode)} mode`;
      const runningOnPort = `on port ${bold(port)}`;
      const runningSince = `[since ${new Date().toISOString()}]`;
      console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
