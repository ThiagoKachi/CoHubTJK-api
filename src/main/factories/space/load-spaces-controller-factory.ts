import { DbLoadSpaces } from '@data/usecases/space/db-load-spaces';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { LoadSpacesController } from '@presentation/controllers/space/load-spaces-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadSpacesController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const loadSpaces = new DbLoadSpaces(spaceRepository);

  return new LoadSpacesController(loadSpaces);
};
