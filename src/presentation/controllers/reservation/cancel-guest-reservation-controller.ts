import { CancelGuestReservation } from '@domain/usecases/reservation/cancel-guest-reservation';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { CancelGuestReservationValidator } from '@validation/protocols/cancel-guest-reservation-validator';

export class CancelGuestReservationController implements Controller {
  constructor(
    private readonly cancelGuestReservation: CancelGuestReservation,
    private readonly validator: CancelGuestReservationValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body, params } = httpRequest;

    const guestReservation = await this.cancelGuestReservation
      .cancelGuestReservation({ accountId: httpRequest.accountId!, reservationId: params.id, email: body.email });

    if (guestReservation === null) {
      throw new AppError('Guest not found', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
