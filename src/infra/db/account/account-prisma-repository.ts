import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadAccountByTokenRepository } from '@data/protocols/db/account/load-account-by-token-repository';
import { UpdateAccessTokenRepository } from '@data/protocols/db/account/update-access-token-repository';
import { AccountModel } from '@domain/models/account';
import { Role } from '@prisma/client';
import { prismaClient } from '../prismaClient';

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByIdRepository, LoadAccountByTokenRepository {
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

  async loadByToken(token: string, role?: Role): Promise<AccountModel | null> {
    const account = await prismaClient.account.findFirst({
      where: {
        token,
        OR: role ? [{ role: Role[role] }, { role: 'ADMIN' as Role }] : [{ role: 'ADMIN' as Role }]
      }
    });

    return account;
  }
}
