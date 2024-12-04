import { DbLoadSpaceTimeSlots } from '@data/usecases/time-slots/db-load-space-time-slots';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { TimeSlotsPrismaRepository } from '@infra/db/time-slots/space-time-slots-prisma-repository';
import { LoadSpaceTimeSlotsController } from '@presentation/controllers/time-slots/load-space-time-slots-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadSpaceTimeSlotsController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const timeSlotsPrismaRepository = new TimeSlotsPrismaRepository();
  const loadSpaces = new DbLoadSpaceTimeSlots(spaceRepository, timeSlotsPrismaRepository);

  return new LoadSpaceTimeSlotsController(loadSpaces);
};
