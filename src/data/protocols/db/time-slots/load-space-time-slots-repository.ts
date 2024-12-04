import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';

export interface LoadSpaceTimeSlotsRepository {
  load (spaceId: string): Promise<SpaceTimeSlotsModel[] | null>
}
