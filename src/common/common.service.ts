import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '@src/modules/logger/logger.service';

@Injectable()
export class CommonService {
  constructor(private readonly devLogger: LoggerService) {}

  public async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.devLogger.error(error, null, CommonService.name);
      throw new InternalServerErrorException(error);
    }
  }
}
