import { LoadAccountByToken } from '@domain/usecases/account/load-account-by-token';
import { AppError } from '@presentation/errors/AppError';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.authorization;
      const token = accessToken?.slice(7);

      if (accessToken) {
        const account = await this.loadAccountByToken.load(token, this.role);
        if (account) {
          return {
            statusCode: 200,
            body: {
              accountId: account.id
            }
          };
        }
      }

      return {
        statusCode: 403,
        body: {
          error: new AppError('Unauthorized', 403)
        }
      };
    } catch {
      return {
        statusCode: 400,
        body: {
          error: new AppError('Unexpected error', 400)
        }
      };
    }
  }
}
