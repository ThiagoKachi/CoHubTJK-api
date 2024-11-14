import { UpdateSpaceModel } from '@domain/models/space/update-space';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { UpdateSpaceValidator } from '@validation/protocols/update-space-validator';
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
    available: z.boolean().optional()
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
