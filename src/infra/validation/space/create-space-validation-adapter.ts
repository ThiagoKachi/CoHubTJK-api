import { AddSpaceModel } from '@domain/models/space/add-space';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { AddSpaceValidator } from '@validation/protocols/add-space-validator';
import { z } from 'zod';

export class AddSpaceValidatorAdapter implements AddSpaceValidator {
  private createSpaceSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    capacity: z.number().min(1, 'Capacity is required'),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()),
    price: z.number().min(1, 'Price is required'),
    images: z.array(z.string()),
    resources: z.array(z.string()),
    street: z.string().min(1, 'Street is required'),
    number: z.number().min(1, 'Number is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postal_code: z.string().min(1, 'Postal code is required'),
    neighborhood: z.string().min(1, 'Neighborhood is required'),
    complement: z.string().optional(),
    available: z.boolean()
  });

  validate (data: AddSpaceModel): void | ValidationError {
    const result = this.createSpaceSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
