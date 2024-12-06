import { AddSpaceTimeSlotRepository } from '@data/protocols/db/time-slots/add-space-time-slot-repository';
import { LoadSpaceTimeSlotsRepository } from '@data/protocols/db/time-slots/load-space-time-slots-repository';
import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';
import { TimeSlotStatus } from '@prisma/client';
import { prismaClient } from '../prismaClient';

export class TimeSlotsPrismaRepository implements LoadSpaceTimeSlotsRepository, AddSpaceTimeSlotRepository {
  async add(timeSlotData: AddSpaceTimeSlotModel): Promise<SpaceTimeSlotsModel | null> {
    const timeSlot = await prismaClient.timeSlot
      .create({ data: { ...timeSlotData, type: 'custom', status: timeSlotData.status as TimeSlotStatus } });

    return timeSlot && timeSlot;
  }

  async load(spaceId: string): Promise<SpaceTimeSlotsModel[] | null> {
    const timeSlots = await prismaClient.timeSlot.findMany({ where: { spaceId } });

    return timeSlots && timeSlots;
  }
}
