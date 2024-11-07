import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface AddReservationValidator {
  validate (data: AddReservationModel): void | ValidationError
}
