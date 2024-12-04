import { LoadSpaceTimeSlotsRepository } from '@data/protocols/db/time-slots/load-space-time-slots-repository';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';
import { prismaClient } from '../prismaClient';

export class TimeSlotsPrismaRepository implements LoadSpaceTimeSlotsRepository {
  async load(spaceId: string): Promise<SpaceTimeSlotsModel[] | null> {
    const timeSlots = await prismaClient.timeSlot.findMany({ where: { spaceId } });

    return timeSlots && timeSlots;
  }
}
