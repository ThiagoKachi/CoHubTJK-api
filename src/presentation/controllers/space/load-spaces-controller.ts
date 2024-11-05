import { LoadSpaces } from '@domain/usecases/space/load-spaces';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';

export class LoadSpacesController implements Controller {
  constructor(
    private readonly loadSpaces: LoadSpaces,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { query } = httpRequest;

    const spaces = await this.loadSpaces.load(query);

    return {
      statusCode: 200,
      body: { spaces }
    };

  }
}
