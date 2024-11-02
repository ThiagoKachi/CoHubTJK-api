import { AddAccountModel } from '@domain/models/add-account';
import { ValidationError } from '@domain/models/validation-error';

export interface SignupValidator {
  validate (data: AddAccountModel): void | ValidationError
}
