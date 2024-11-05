import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { AddSpaceModel } from '@domain/models/add-space';
import { SpaceModel } from '@domain/models/space';
import { AddSpace } from '@domain/usecases/space/add-space';

export class DbAddSpace implements AddSpace {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addSpaceRepository: AddSpaceRepository
  ) {}

  async add(spaceData: AddSpaceModel): Promise<SpaceModel | null> {
    const isAdmin = await this.loadAccountByIdRepository.loadById(spaceData.accountId);

    if (isAdmin?.role === 'ADMIN') {
      return await this.addSpaceRepository.add(spaceData);
    }

    return null;
  }
}
