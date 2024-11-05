import { AddSpaceModel } from '@domain/models/add-space';
import { ValidationError } from '@domain/models/validation-error';

export interface AddSpaceValidator {
  validate (data: AddSpaceModel): void | ValidationError
}
