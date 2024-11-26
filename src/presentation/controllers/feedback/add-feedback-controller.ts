import { AddFeedback } from '@domain/usecases/feedback/add-feedback';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { AddFeedbackValidator } from '@validation/protocols/feedback/add-feedback-validator';

export class AddFeedbackController implements Controller {
  constructor(
    private readonly addFeedback: AddFeedback,
    private readonly validator: AddFeedbackValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body } = httpRequest;

    const feedback = await this.addFeedback.add(body);

    if (feedback === null) {
      throw new AppError('The feedback is not available', 400);
    }

    return {
      statusCode: 201,
      body: null
    };
  }
}
