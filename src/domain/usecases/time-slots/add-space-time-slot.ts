import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';

export interface AddSpaceTimeSlot {
  add (timeSlotData: AddSpaceTimeSlotModel, accountId: string): Promise<SpaceTimeSlotsModel | null>
}
