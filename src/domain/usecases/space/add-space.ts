import { AddSpaceModel } from '@domain/models/add-space';
import { SpaceModel } from '@domain/models/space';

export interface AddSpace {
  add (space: AddSpaceModel): Promise<SpaceModel | null>
}
