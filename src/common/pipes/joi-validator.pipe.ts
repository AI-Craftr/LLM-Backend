import { ObjectSchema } from 'joi';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException({
        error: 'Validator failed',
        message: error.message.replace(/(\"|\[|\d\])/g, ''),
      });
    }

    return value;
  }
}
