import { LoadSpaceTimeSlots } from '@domain/usecases/time-slots/load-space-time-slots';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadSpaceTimeSlotsController implements Controller {
  constructor(private readonly loadSpaceTimeSlots: LoadSpaceTimeSlots) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { query } = httpRequest;

    const timeSlots = await this.loadSpaceTimeSlots.load({ accountId: httpRequest.accountId!, spaceId: query.spaceId });

    if (timeSlots === null) {
      throw new AppError('No time slots found', 400);
    }

    return {
      statusCode: 200,
      body: { time_slots: timeSlots ? timeSlots : [] }
    };

  }
}
