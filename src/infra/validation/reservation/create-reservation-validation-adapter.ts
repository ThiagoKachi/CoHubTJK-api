import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { AddReservationValidator } from '@validation/protocols/reservation/add-reservation-validator';
import { z } from 'zod';

export class AddReservationValidatorAdapter implements AddReservationValidator {
  private createReservationSchema = z.object({
    date: z.string(),
    spaceId: z.string().uuid(),
  });

  validate (data: AddReservationModel): void | ValidationError {
    const result = this.createReservationSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
