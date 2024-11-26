import { SendReservationInvite } from '@domain/usecases/reservation/send-reservation-invite';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { SendReservationInvitesValidator } from '@validation/protocols/reservation/send-reservation-invites-validator';

export class SendReservationInviteController implements Controller {
  constructor(
    private readonly sendReservationInvite: SendReservationInvite,
    private readonly validator: SendReservationInvitesValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body, params } = httpRequest;

    const invite = await this.sendReservationInvite.send({ accountId: httpRequest.accountId!, reservationId: params.id, ...body });

    if (invite === null) {
      throw new AppError('The reservation is not available', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
