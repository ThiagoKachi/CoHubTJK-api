import { SpaceModel } from '@domain/models/space/space';
import { UpdateSpaceModel } from '@domain/models/space/update-space';

export interface UpdateSpaceRepository {
  updateSpace (spaceId: string, spaceData: UpdateSpaceModel): Promise<SpaceModel>
}
