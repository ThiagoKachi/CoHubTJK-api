import { SpaceModel } from '@domain/models/space/space';
import { ListSpacesFilters } from '@domain/usecases/space/load-spaces';

export interface LoadSpacesRepository {
  load (filters: ListSpacesFilters): Promise<SpaceModel[]>
}
