import { CancelGuestReservationModel } from '@domain/models/reservation/cancel-guest-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface CancelGuestReservationValidator {
  validate (data: CancelGuestReservationModel): void | ValidationError
}
