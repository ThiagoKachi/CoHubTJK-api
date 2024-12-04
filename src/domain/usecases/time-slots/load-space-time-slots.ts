import { LoadSpaceTimeSlotsModel } from '@domain/models/time-slots/load-space-time-slots';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';

export interface LoadSpaceTimeSlots {
  load ({ accountId, spaceId }: LoadSpaceTimeSlotsModel): Promise<SpaceTimeSlotsModel[] | null>
}
