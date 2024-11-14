import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { FinishReservationValidator } from '@validation/protocols/finish-reservation-validator';
import { z } from 'zod';

export class FinishReservationValidatorAdapter implements FinishReservationValidator {
  private finishReservationSchema = z.object({
    reservationId: z.string().uuid(),
  });

  validate (data: FinishReservationModel): void | ValidationError {
    const result = this.finishReservationSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
