import { DbAddSpace } from '@data/usecases/space/db-add-space';
import { AccountPrismaRepository } from '@infra/db/account/account-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { AddSpaceValidatorAdapter } from '@infra/validation/create-space-validation-adapter';
import { AddSpaceController } from '@presentation/controllers/space/add-space-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeSpaceController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const addSpace = new DbAddSpace(accountRepository, spaceRepository);

  const validator = new AddSpaceValidatorAdapter();

  return new AddSpaceController(
    addSpace,
    validator
  );
};