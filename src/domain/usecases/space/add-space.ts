import { AddSpaceModel } from '@domain/models/space/add-space';
import { SpaceModel } from '@domain/models/space/space';

export interface AddSpace {
  add (spaceData: AddSpaceModel): Promise<SpaceModel>
}
