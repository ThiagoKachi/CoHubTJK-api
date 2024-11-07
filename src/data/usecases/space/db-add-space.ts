import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { AddSpaceModel } from '@domain/models/space/add-space';
import { SpaceModel } from '@domain/models/space/space';
import { AddSpace } from '@domain/usecases/space/add-space';

export class DbAddSpace implements AddSpace {
  constructor(private readonly addSpaceRepository: AddSpaceRepository) {}

  async add(spaceData: AddSpaceModel): Promise<SpaceModel | null> {
    return await this.addSpaceRepository.add(spaceData);

  }
}
