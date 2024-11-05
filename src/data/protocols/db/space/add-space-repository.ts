import { AddSpaceModel } from '@domain/models/add-space';
import { SpaceModel } from '@domain/models/space';

export interface AddSpaceRepository {
  add (spaceData: AddSpaceModel): Promise<SpaceModel>
}
