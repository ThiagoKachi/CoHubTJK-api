import { AuthenticationModel } from '@domain/models/authentication';
import { ValidationError } from '@domain/models/validation-error';

export interface SigninValidator {
  validate (data: AuthenticationModel): void | ValidationError
}
