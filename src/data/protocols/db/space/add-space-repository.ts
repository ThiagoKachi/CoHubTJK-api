import { AddSpaceModel } from '@domain/models/space/add-space';
import { SpaceModel } from '@domain/models/space/space';

export interface AddSpaceRepository {
  add (spaceData: AddSpaceModel): Promise<SpaceModel>
}
