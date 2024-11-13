import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { UpdateSpaceRepository } from '@data/protocols/db/space/update-space-repository';
import { SpaceModel } from '@domain/models/space/space';
import { IUpdateSpace, UpdateSpace } from '@domain/usecases/space/updade-space';

export class DbUpdateSpace implements UpdateSpace {
  constructor(
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
    private readonly updateSpaceRepository: UpdateSpaceRepository,
  ) {}

  async update({ accountId, data, spaceId }: IUpdateSpace): Promise<SpaceModel | null> {
    const space = await this.loadSpaceByIdRepository.loadById(spaceId);

    if (space) {
      if (space.accountId === accountId) {
        const updatedSpace = await this.updateSpaceRepository.updateSpace(spaceId, data);

        return updatedSpace;
      }
    }
    return null;
  }
}
