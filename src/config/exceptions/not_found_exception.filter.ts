import { BaseExceptionFilter } from '@nestjs/core';
import { Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { LoggerService } from '@src/modules/logger/logger.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = `404 Error: ${exception.message}`;

    // Log the 404 error message
    this.logger.error(message, undefined, 'NotFoundExceptionFilter');

    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Resource not found',
    });
  }
}
