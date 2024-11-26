import { CancelGuestReservationModel } from '@domain/models/reservation/cancel-guest-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { CancelGuestReservationValidator } from '@validation/protocols/reservation/cancel-guest-reservation-validator';
import { z } from 'zod';

export class CancelGuestReservationValidatorAdapter implements CancelGuestReservationValidator {
  private cancelGuestReservationSchema = z.object({
    email: z.string().email().min(1, 'E-mail is required'),
  });

  validate (data: CancelGuestReservationModel): void | ValidationError {
    const result = this.cancelGuestReservationSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
