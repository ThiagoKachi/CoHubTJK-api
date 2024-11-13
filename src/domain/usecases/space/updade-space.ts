import { SpaceModel } from '@domain/models/space/space';
import { UpdateSpaceModel } from '@domain/models/space/update-space';

export interface UpdateSpace {
  update (space: UpdateSpaceModel): Promise<SpaceModel | null>
}
