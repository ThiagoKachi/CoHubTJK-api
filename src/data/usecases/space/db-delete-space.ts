import { DeleteSpaceRepository } from '@data/protocols/db/space/delete-space-repository';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { DeleteSpace } from '@domain/usecases/space/delete-space';

export class DbDeleteSpace implements DeleteSpace {
  constructor(
    private readonly deleteSpaceRepository: DeleteSpaceRepository,
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
  ) {}

  async delete(spaceId: string): Promise<void | null> {
    const space = await this.loadSpaceByIdRepository.loadById(spaceId);

    if (space) {
      return await this.deleteSpaceRepository.delete(spaceId);
    }

    return null;
  }
}
