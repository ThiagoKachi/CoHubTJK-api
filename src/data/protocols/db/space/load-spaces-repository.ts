import { SpaceModel } from '@domain/models/space';
import { ListSpacesFilters } from '@domain/usecases/space/load-spaces';

export interface LoadSpacesRepository {
  load (filters: ListSpacesFilters): Promise<SpaceModel[]>
}
