import { ReservationInviteResponse } from '@domain/usecases/reservation/reservation-invite-response';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { ReservationInviteResponseValidator } from '@validation/protocols/reservation-invite-response-validator';

export class ReservationInviteResponseController implements Controller {
  constructor(
    private readonly reservationInviteResponse: ReservationInviteResponse,
    private readonly validator: ReservationInviteResponseValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body } = httpRequest;

    const inviteResponse = await this.reservationInviteResponse.changeResponse(body);

    if (inviteResponse === null) {
      throw new AppError('Invite not found', 400);
    }

    return {
      statusCode: 200,
      body: null
    };
  }
}
