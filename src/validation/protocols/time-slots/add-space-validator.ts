import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface AddSpaceTimeSlotValidator {
  validate (data: AddSpaceTimeSlotModel): void | ValidationError
}
