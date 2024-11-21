import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { DevLoggerService } from './dev_logger.service';

@Global()
@Module({
  providers: [LoggerService, DevLoggerService],
  exports: [LoggerService, DevLoggerService],
})
export class LoggerModule {}
