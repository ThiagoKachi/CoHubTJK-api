import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { SendReservationInvitesValidator } from '@validation/protocols/reservation/send-reservation-invites-validator';
import { z } from 'zod';

export class SendReservationInvitesValidatorAdapter implements SendReservationInvitesValidator {
  private sendReservationInvitesSchema = z.object({
    guests: z.array(z.object({
      email: z.string().email({ message: 'Invalid email' }).min(1, 'Email is required'),
      name: z.string().min(1, 'Name is required')
    }))
  });

  validate (data: SendReservationInviteModel): void | ValidationError {
    const result = this.sendReservationInvitesSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
