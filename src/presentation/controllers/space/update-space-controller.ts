import { UpdateSpace } from '@domain/usecases/space/updade-space';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { UpdateSpaceValidator } from '@validation/protocols/space/update-space-validator';

export class UpdateSpaceController implements Controller {
  constructor(
    private readonly updateSpace: UpdateSpace,
    private readonly validator: UpdateSpaceValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body, params } = httpRequest;

    const space = await this.updateSpace.update({ accountId: httpRequest.accountId!, spaceId: params.spaceId, data: body });

    if (!space) {
      throw new AppError('Unable to update space', 400);
    }

    return {
      statusCode: 200,
      body: { space }
    };
  }
}
