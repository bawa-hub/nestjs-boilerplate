import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from 'class-validator';
  import { DisposableDominList } from '../constants';
  @ValidatorConstraint({ async: true })
  export class DisposableEmailCheckConstraint
    implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments) {
      let checkEmailDomin = DisposableDominList.includes(
        email && email.split('@')[1]
      );
      return !checkEmailDomin;
    }
  }
  export function DisposableEmailCheck(validationOptions?: ValidationOptions) {
    validationOptions = {
      ...{ message: 'ERROR! you can not use disposable email.' },
      ...validationOptions
    };
    return function(object: Record<string, any>, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: DisposableEmailCheckConstraint
      });
    };
  }