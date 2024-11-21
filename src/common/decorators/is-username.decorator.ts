import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return typeof username === 'string' && usernameRegex.test(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username can only contain letters, numbers, and underscores.';
  }
}

export function IsUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameConstraint,
    });
  };
}
