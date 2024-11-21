import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, catchError, throwError } from 'rxjs';
import * as FileSystem from '../utils/file-system.util';

@Injectable()
export class DeleteUploadedFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const uploadedFile = (req as any).file;

    return next.handle().pipe(
      catchError((err, caught) => {
        if (uploadedFile) {
          FileSystem.deleteIfExists(uploadedFile.path);
        }
        return throwError(() => err);
      }),
    );
  }
}
