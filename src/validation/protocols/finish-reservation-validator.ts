import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface FinishReservationValidator {
  validate (data: FinishReservationModel): void | ValidationError
}
