import { AddAccountModel } from '@domain/models/account/add-account';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface SignupValidator {
  validate (data: AddAccountModel): void | ValidationError
}
