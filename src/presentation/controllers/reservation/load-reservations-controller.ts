import { LoadReservations } from '@domain/usecases/reservation/load-reservations';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadReservationsController implements Controller {
  constructor(
    private readonly loadReservation: LoadReservations,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const reservations = await this.loadReservation.load({ accountId: httpRequest.accountId! });

    if (reservations === null) {
      throw new AppError('No reservations found', 400);
    }

    return {
      statusCode: 200,
      body: {
        reservations
      }
    };
  }
}
