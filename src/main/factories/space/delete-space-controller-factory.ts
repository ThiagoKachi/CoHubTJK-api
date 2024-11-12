import { DbDeleteSpace } from '@data/usecases/space/db-delete-space';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { DeleteSpaceController } from '@presentation/controllers/space/delete-space-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeDeleteSpaceController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const deleteSpace = new DbDeleteSpace(spaceRepository, spaceRepository);

  return new DeleteSpaceController(deleteSpace);
};
