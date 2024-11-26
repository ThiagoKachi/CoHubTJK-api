import { ReservationInviteResponseModel } from '@domain/models/reservation/reservation-invite-response';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { ReservationInviteResponseValidator } from '@validation/protocols/reservation/reservation-invite-response-validator';
import { z } from 'zod';

export class ReservationInviteResponseValidatorAdapter implements ReservationInviteResponseValidator {
  private ReservationInviteResponseSchema = z.object({
    token: z.string().min(1, 'Validation Token is required'),
    response: z.enum(['accepted', 'declined', 'pending'])
  });

  validate (data: ReservationInviteResponseModel): void | ValidationError {
    const result = this.ReservationInviteResponseSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
