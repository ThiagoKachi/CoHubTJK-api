import { LoadSpacesRepository } from '@data/protocols/db/space/load-spaces-repository';
import { SpaceModel } from '@domain/models/space';
import { ListSpacesFilters, LoadSpaces } from '@domain/usecases/space/load-spaces';

export class DbLoadSpaces implements LoadSpaces {
  constructor(private readonly loadSpacesRepository: LoadSpacesRepository) {}

  async load(filters: ListSpacesFilters): Promise<SpaceModel[]> {
    const spaces = await this.loadSpacesRepository.load(filters);

    return spaces;
  }
}
