import { AuthenticationModel } from '@domain/models/account/authentication';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface SigninValidator {
  validate (data: AuthenticationModel): void | ValidationError
}
