import { FinishReservation } from '@domain/usecases/reservation/finish-reservation';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { FinishReservationValidator } from '@validation/protocols/reservation/finish-reservation-validator';

export class FinishReservationController implements Controller {
  constructor(
    private readonly finishReservation: FinishReservation,
    private readonly validator: FinishReservationValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body } = httpRequest;

    const reservation = await this.finishReservation
      .finish({ accountId: httpRequest.accountId!, reservationId: body.reservationId });

    if (reservation === null) {
      throw new AppError('Reservation not found', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
