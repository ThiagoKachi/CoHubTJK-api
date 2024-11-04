import { DbAuthentication } from '@data/usecases/account/db-authentication';
import { BcryptAdapter } from '@infra/cryptography/bcrypt-adapter';
import { JWTAdapter } from '@infra/cryptography/jwt-adapter';
import { AccountPrismaRepository } from '@infra/db/account-prisma-repository';
import { SigninValidatorAdapter } from '@infra/validation/signin-validation-adapter';
import { env } from '@main/config/env';
import { LoginController } from '@presentation/controllers/login/login-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const hasher = new BcryptAdapter();
  const encrypter = new JWTAdapter(env.JWT_SECRET!);
  const signUp = new DbAuthentication(accountRepository, hasher, encrypter, accountRepository);

  const validator = new SigninValidatorAdapter();

  return new LoginController(
    signUp,
    validator
  );
};
