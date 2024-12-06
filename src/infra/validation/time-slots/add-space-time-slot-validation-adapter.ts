import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { AddSpaceTimeSlotValidator } from '@validation/protocols/time-slots/add-space-validator';
import { z } from 'zod';

export class AddSpaceTimeSlotValidatorAdapter implements AddSpaceTimeSlotValidator {
  private addSpaceTimeSLotSchema = z.object({
    date: z.string().min(1, { message: 'Date is required' }),
    startTime: z.number().min(1, { message: 'Min hour is 01h' }).max(23, { message: 'Max hour is 23h' }),
    endTime: z.number().min(1, { message: 'Min hour is 01h' }).max(23, { message: 'Max hour is 23h' }),
    status: z.enum(['available', 'unavailable', 'temporary_blocked'])
  });

  validate (data: AddSpaceTimeSlotModel): void | ValidationError {
    const result = this.addSpaceTimeSLotSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
