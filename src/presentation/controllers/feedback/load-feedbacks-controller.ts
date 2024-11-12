import { LoadFeedbacks } from '@domain/usecases/feedback/load-feedbacks';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadFeedbacksController implements Controller {
  constructor(
    private readonly loadFeedbacks: LoadFeedbacks,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;

    const feedbacks = await this.loadFeedbacks.load({ reservationId: params.reservationId });

    if (!feedbacks) {
      throw new AppError('No feedbacks found', 400);
    }

    return {
      statusCode: 200,
      body: { feedbacks }
    };
  }
}
