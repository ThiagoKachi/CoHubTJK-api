import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface CancelReservationValidator {
  validate (data: CancelReservationModel): void | ValidationError
}
