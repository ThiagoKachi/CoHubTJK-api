import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { ValidationError } from '@domain/models/validation-error/validation-error';

export interface AddFeedbackValidator {
  validate (data: AddFeedbackModel): void | ValidationError
}
