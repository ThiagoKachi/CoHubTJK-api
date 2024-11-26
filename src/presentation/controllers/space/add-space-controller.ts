import { AddSpace } from '@domain/usecases/space/add-space';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { AddSpaceValidator } from '@validation/protocols/space/add-space-validator';

export class AddSpaceController implements Controller {
  constructor(
    private readonly addSpace: AddSpace,
    private readonly validator: AddSpaceValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { body } = httpRequest;

    const space = await this.addSpace.add({ ...body, accountId: httpRequest.accountId });

    if (!space) {
      throw new AppError('Unable to create space', 400);
    }

    return {
      statusCode: 201,
      body: { space }
    };
  }
}
