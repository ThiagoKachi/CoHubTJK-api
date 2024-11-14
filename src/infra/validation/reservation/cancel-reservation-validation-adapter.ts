import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { CancelReservationValidator } from '@validation/protocols/cancel-reservation-validator';
import { z } from 'zod';

export class CancelReservationValidatorAdapter implements CancelReservationValidator {
  private cancelReservationSchema = z.object({
    spaceId: z.string().uuid(),
  });

  validate (data: CancelReservationModel): void | ValidationError {
    const result = this.cancelReservationSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
