import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface SendReservationInvitesValidator {
  validate (data: SendReservationInviteModel): void | ValidationError
}
