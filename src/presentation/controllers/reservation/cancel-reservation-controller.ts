import { CancelReservation } from '@domain/usecases/reservation/cancel-reservation';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { CancelReservationValidator } from '@validation/protocols/cancel-reservation-validator';

export class CancelReservationController implements Controller {
  constructor(
    private readonly cancelReservation: CancelReservation,
    private readonly validator: CancelReservationValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body, params } = httpRequest;

    const reservation = await this.cancelReservation
      .cancel({ spaceId: body.spaceId, accountId: httpRequest.accountId!, reservationId: params.id });

    if (reservation === null) {
      throw new AppError('Reservation not found', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
