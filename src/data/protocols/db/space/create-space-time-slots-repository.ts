import { WorkingHours } from '@domain/models/space/space';

export interface CreateSpaceTimeSlotsRepository {
  createTimeSlots (spaceTimeSlotsData: WorkingHours): Promise<void>
}
