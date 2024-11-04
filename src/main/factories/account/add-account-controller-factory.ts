import { DbAddAccount } from '@data/usecases/account/db-add-account';
import { BcryptAdapter } from '@infra/cryptography/bcrypt-adapter';
import { AccountPrismaRepository } from '@infra/db/account-prisma-repository';
import { SignupValidatorAdapter } from '@infra/validation/signup-validation-adapter';
import { SignupController } from '@presentation/controllers/login/signup-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeSignUpController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const hasher = new BcryptAdapter();
  const addAccount = new DbAddAccount(accountRepository, hasher, accountRepository);

  const validator = new SignupValidatorAdapter();

  return new SignupController(
    addAccount,
    validator
  );
};
