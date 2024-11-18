import { LoadGuestReservations } from '@domain/usecases/reservation/load-guest-reservations';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadGuestReservationsController implements Controller {
  constructor(
    private readonly loadGuestReservations: LoadGuestReservations,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;

    const reservations = await this.loadGuestReservations
      .loadGuestReservations(body.email);

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
