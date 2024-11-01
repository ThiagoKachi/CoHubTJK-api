import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { Controller } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { EmailValidator } from '@validation/protocols/email-validator';

export class SignupController implements Controller {
  constructor(
    private readonly addAccount: AddAccountRepository,
    private readonly emailValidator: EmailValidator

  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    // Valida os dados
    // Criar a conta
    // Retornar uma resposta (Sem a senha)
    const { name, email, password } = httpRequest.body;
    const account = await this.addAccount.add({
      name,
      email,
      password
    });
  }
}
