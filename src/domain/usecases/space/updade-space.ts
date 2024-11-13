import { SpaceModel } from '@domain/models/space/space';
import { UpdateSpaceModel } from '@domain/models/space/update-space';

export type IUpdateSpace = {
  accountId: string;
  spaceId: string;
  data: UpdateSpaceModel;
}

export interface UpdateSpace {
  update ({ accountId, spaceId, data }: IUpdateSpace): Promise<SpaceModel | null>
}
