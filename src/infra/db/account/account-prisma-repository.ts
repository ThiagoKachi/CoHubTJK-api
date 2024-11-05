import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { UpdateAccessTokenRepository } from '@data/protocols/db/account/update-access-token-repository';
import { AccountModel } from '@domain/models/account';
import { prismaClient } from '../prismaClient';

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByIdRepository {
  async loadByEmail(email: string): Promise<AccountModel | null> {
    const account = await prismaClient.account.findFirst({ where: { email } });

    return account;
  }

  async loadById(id: string): Promise<AccountModel | null> {
    const account = await prismaClient.account.findFirst({ where: { id } });

    return account;
  }

  async add(accountData: AccountModel): Promise<AccountModel> {
    await prismaClient.account.create({ data: accountData });

    return accountData;
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await prismaClient.account.update({ where: { id }, data: { token } });
  }
}
