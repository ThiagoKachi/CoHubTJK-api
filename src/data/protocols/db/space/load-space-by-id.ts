import { SpaceModel } from '@domain/models/space/space';

export interface LoadSpaceByIdRepository {
  loadById (id: string): Promise<SpaceModel | null>
}
