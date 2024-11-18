import { LoadReservationGuests } from '@domain/usecases/reservation/load-reservation-guests';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadReservationGuestsController implements Controller {
  constructor(
    private readonly loadReservationGuests: LoadReservationGuests,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const guests = await this.loadReservationGuests.loadGuests({ accountId: httpRequest.accountId!, reservationId: httpRequest.params.id });

    if (guests === null) {
      throw new AppError('No guests found', 400);
    }

    return {
      statusCode: 200,
      body: {
        guests
      }
    };
  }
}
