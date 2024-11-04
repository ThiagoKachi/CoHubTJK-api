import { Authentication } from '@domain/usecases/account/authentication';
import { AppError } from '@presentation/errors/AppError';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { SigninValidator } from '@validation/protocols/signin-validator';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validator: SigninValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error && !error.success && error.error.issues) {
      throw new AppError(error.error.issues, 400);
    }

    const { email, password } = httpRequest.body;

    const accessToken = await this.authentication.auth({
      email,
      password
    });

    if (!accessToken) {
      throw new AppError('Unauthorized', 401);
    }

    return {
      statusCode: 200,
      body: { accessToken }
    };
  }
}
