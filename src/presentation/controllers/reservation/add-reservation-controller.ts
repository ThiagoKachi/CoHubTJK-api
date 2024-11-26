import { AddReservation } from '@domain/usecases/reservation/add-reservation';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { AddReservationValidator } from '@validation/protocols/reservation/add-reservation-validator';

export class AddReservationController implements Controller {
  constructor(
    private readonly addReservation: AddReservation,
    private readonly validator: AddReservationValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body } = httpRequest;

    const reservation = await this.addReservation.add({ ...body, accountId: httpRequest.accountId });

    if (!reservation) {
      throw new AppError('The reservation is not available', 400);
    }

    return {
      statusCode: 201,
      body: { reservation }
    };
  }
}
