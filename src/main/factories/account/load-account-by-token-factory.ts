import { DbLoadAccountByToken } from '@data/usecases/account/db-load-account-by-token';
import { LoadAccountByToken } from '@domain/usecases/account/load-account-by-token';
import { JWTAdapter } from '@infra/cryptography/jwt-adapter';
import { AccountPrismaRepository } from '@infra/db/account/account-prisma-repository';
import { env } from '@main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.JWT_SECRET);
  const accountMongoRepository = new AccountPrismaRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
