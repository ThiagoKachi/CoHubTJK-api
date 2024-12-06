import { DbAddSpaceTimeSlot } from '@data/usecases/time-slots/db-add-space-time-slot';
import { DateFnsAdapter } from '@infra/date/date-fns-adapter';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { TimeSlotsPrismaRepository } from '@infra/db/time-slots/space-time-slots-prisma-repository';
import { AddSpaceTimeSlotValidatorAdapter } from '@infra/validation/time-slots/add-space-time-slot-validation-adapter';
import { AddSpaceTimeSlotController } from '@presentation/controllers/time-slots/add-space-time-slot-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeAddSpaceTimeSlotController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const timeSlotsPrismaRepository = new TimeSlotsPrismaRepository();
  const dateFnsAdapter = new DateFnsAdapter();
  const addSpace = new DbAddSpaceTimeSlot(
    spaceRepository,
    timeSlotsPrismaRepository,
    dateFnsAdapter,
    dateFnsAdapter,
    timeSlotsPrismaRepository
  );

  const validator = new AddSpaceTimeSlotValidatorAdapter();

  return new AddSpaceTimeSlotController(addSpace, validator);
};
