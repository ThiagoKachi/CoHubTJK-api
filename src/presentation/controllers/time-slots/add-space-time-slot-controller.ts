import { AddSpaceTimeSlot } from '@domain/usecases/time-slots/add-space-time-slot';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { AddSpaceTimeSlotValidator } from '@validation/protocols/time-slots/add-space-validator';

export class AddSpaceTimeSlotController implements Controller {
  constructor(
    private readonly addSpaceTimeSlot: AddSpaceTimeSlot,
    private readonly validator: AddSpaceTimeSlotValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { params, body } = httpRequest;

    const timeSlot = await this.addSpaceTimeSlot
      .add({ ...body, spaceId: params.spaceId }, httpRequest.accountId!);

    if (timeSlot === null) {
      throw new AppError('Unable to create time slot', 400);
    }

    return {
      statusCode: 201,
      body: { timeSlot }
    };

  }
}
