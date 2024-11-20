import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { AddFeedbackValidator } from '@validation/protocols/add-feedback-validator';
import { z } from 'zod';

export class AddFeedbackValidatorAdapter implements AddFeedbackValidator {
  private createFeedbackSchema = z.object({
    rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
    feedback: z.string().optional(),
    token: z.string().min(1, 'Token is required'),
  });

  validate (data: AddFeedbackModel): void | ValidationError {
    const result = this.createFeedbackSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
