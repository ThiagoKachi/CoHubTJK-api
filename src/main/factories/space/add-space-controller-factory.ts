import { DbAddSpace } from '@data/usecases/space/db-add-space';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { AddSpaceValidatorAdapter } from '@infra/validation/space/create-space-validation-adapter';
import { AddSpaceController } from '@presentation/controllers/space/add-space-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeSpaceController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const addSpace = new DbAddSpace(spaceRepository);

  const validator = new AddSpaceValidatorAdapter();

  return new AddSpaceController(
    addSpace,
    validator
  );
};
