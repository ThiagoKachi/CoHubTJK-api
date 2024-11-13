import { UpdateSpaceModel } from '@domain/models/space/update-space';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface UpdateSpaceValidator {
  validate (data: UpdateSpaceModel): void | ValidationError
}
