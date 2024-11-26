import { AddAccount } from '@domain/usecases/account/add-account';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { SignupValidator } from '@validation/protocols/account/signup-validator';

export class SignupController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validator: SignupValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { name, email, password } = httpRequest.body;

    const account = await this.addAccount.add({
      name,
      email,
      password
    });

    if (!account) {
      throw new AppError('User already exists', 409);
    }

    return {
      statusCode: 201,
      body: { ...account, password: undefined }
    };
  }
}
