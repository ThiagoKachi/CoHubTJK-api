import { SpaceModel } from '@domain/models/space/space';
import { UpdateSpaceModel } from '@domain/models/space/update-space';

export interface UpdateSpaceRepository {
  updateSpace (spaceData: UpdateSpaceModel): Promise<SpaceModel>
}
