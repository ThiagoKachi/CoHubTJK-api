import { CancelReservation } from '@domain/usecases/reservation/cancel-reservation';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class CancelReservationController implements Controller {
  constructor(
    private readonly cancelReservation: CancelReservation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;

    const reservation = await this.cancelReservation
      .cancel({ accountId: httpRequest.accountId!, reservationId: params.id });

    if (reservation === null) {
      throw new AppError('Reservation not found', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
