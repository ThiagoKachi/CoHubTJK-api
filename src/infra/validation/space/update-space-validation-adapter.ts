import { UpdateSpaceModel } from '@domain/models/space/update-space';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { UpdateSpaceValidator } from '@validation/protocols/space/update-space-validator';
import { z } from 'zod';

export class UpdateSpaceValidatorAdapter implements UpdateSpaceValidator {
  private updateSpaceSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    capacity: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.number().optional(),
    images: z.array(z.string()).optional(),
    resources: z.array(z.string()).optional(),
    street: z.string().optional(),
    number: z.number().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    neighborhood: z.string().optional(),
    complement: z.string().optional(),
    available: z.boolean().optional(),
    workingHours: z.object({
      startTime: z.number().min(6, 'Start time is required'),
      endTime: z.number().max(23, 'End time is required'),
      daysOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).array().min(1, 'Days of week is required'),
      slotDuration: z.number().min(30, 'Slot duration is required')
    }).refine((data) => data.endTime > data.startTime, { message: 'End time must be greater than start time' }).optional()
  });

  validate (data: UpdateSpaceModel): void | ValidationError {
    const result = this.updateSpaceSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
