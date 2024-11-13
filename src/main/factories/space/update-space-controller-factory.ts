import { DbUpdateSpace } from '@data/usecases/space/db-update-space';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { UpdateSpaceValidatorAdapter } from '@infra/validation/update-space-validation-adapter';
import { UpdateSpaceController } from '@presentation/controllers/space/update-space-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeUpdateSpaceController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const updateSpace = new DbUpdateSpace(spaceRepository, spaceRepository);

  const validator = new UpdateSpaceValidatorAdapter();

  return new UpdateSpaceController(
    updateSpace,
    validator
  );
};
