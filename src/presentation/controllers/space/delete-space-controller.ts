import { DeleteSpace } from '@domain/usecases/space/delete-space';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class DeleteSpaceController implements Controller {
  constructor(
    private readonly deleteSpace: DeleteSpace,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;

    const space = await this.deleteSpace.delete(params.spaceId);

    if (space === null) {
      throw new AppError('Space not found', 400);
    }

    return {
      statusCode: 204,
      body: null
    };
  }
}
