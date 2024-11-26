import { ReservationInviteResponseModel } from '@domain/models/reservation/reservation-invite-response';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface ReservationInviteResponseValidator {
  validate (data: ReservationInviteResponseModel): void | ValidationError
}
