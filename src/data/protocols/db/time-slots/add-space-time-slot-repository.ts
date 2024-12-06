import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';

export interface AddSpaceTimeSlotRepository {
  add (timeSlotData: AddSpaceTimeSlotModel): Promise<SpaceTimeSlotsModel | null>
}
