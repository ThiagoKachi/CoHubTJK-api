import { AddSpaceModel } from '@domain/models/space/add-space';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface AddSpaceValidator {
  validate (data: AddSpaceModel): void | ValidationError
}
