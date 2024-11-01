import { Hasher } from '@data/protocols/cryptography/hasher';
import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository';
import { AccountModel } from '@domain/models/account';
import { AddAccount } from '@domain/usecases/account/add-account';
import { AppError } from '@presentation/errors/AppError';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: AccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

    if (account) {
      throw new AppError('Account already exists', 409);
    }

    const hashedPassword = await this.hasher.hash(accountData.password);
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    });

    return newAccount;
  }
}
