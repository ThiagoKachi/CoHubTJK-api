
import { Encrypter } from '@data/protocols/cryptography/encrypter';
import { HashComparer } from '@data/protocols/cryptography/hash-comparer';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '@data/protocols/db/account/update-access-token-repository';
import { AuthenticationModel } from '@domain/models/authentication';
import { Authentication } from '@domain/usecases/account/authentication';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly HashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);

    if (account) {
      const isValid = await this.HashComparer.compare(authentication.password, account.password);

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(JSON.stringify({ id: account.id, role: account.role }));

        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);

        return accessToken;
      }
    }

    return null;
  }
}
