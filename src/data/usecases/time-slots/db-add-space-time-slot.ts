import { DateComparer } from '@data/protocols/date/date-comparer';
import { GetDayOfWeek } from '@data/protocols/date/getDayOfWeek';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { AddSpaceTimeSlotRepository } from '@data/protocols/db/time-slots/add-space-time-slot-repository';
import { LoadSpaceTimeSlotsRepository } from '@data/protocols/db/time-slots/load-space-time-slots-repository';
import { AddSpaceTimeSlotModel } from '@domain/models/time-slots/add-space-time-slot';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';
import { AddSpaceTimeSlot } from '@domain/usecases/time-slots/add-space-time-slot';

export class DbAddSpaceTimeSlot implements AddSpaceTimeSlot {
  constructor(
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
    private readonly addSpaceTimeSlotRepository: AddSpaceTimeSlotRepository,
    private readonly getDayOfWeek: GetDayOfWeek,
    private readonly dateComparer: DateComparer,
    private readonly loadSpaceTimeSlotsRepository: LoadSpaceTimeSlotsRepository
  ) {}

  async add(timeSlotData: AddSpaceTimeSlotModel, accountId: string): Promise<SpaceTimeSlotsModel | null> {
    const space = await this.loadSpaceByIdRepository.loadById(timeSlotData.spaceId);

    if (space) {
      const isOwner = space.accountId === accountId;

      if (isOwner) {
        const dayOfWeek = this.getDayOfWeek.getDay(timeSlotData.date);

        if (space.daysOfWeek.includes(dayOfWeek)) {
          const timeSlots = await this.loadSpaceTimeSlotsRepository.load(timeSlotData.spaceId);

          const dateAlreadyExists = timeSlots
            ?.filter((date) => this.dateComparer.compare(date.date.toISOString(),timeSlotData.date));

          // Horário já existe
          if (dateAlreadyExists && dateAlreadyExists.length > 0) {
            const overlappingSlot = dateAlreadyExists.find(
              (existingSlot) =>
                (timeSlotData.startTime >= existingSlot.startTime && timeSlotData.startTime < existingSlot.endTime) ||
                (timeSlotData.endTime > existingSlot.startTime && timeSlotData.endTime <= existingSlot.endTime) ||
                (timeSlotData.startTime <= existingSlot.startTime && timeSlotData.endTime >= existingSlot.endTime)
            );

            if (overlappingSlot) {
              return null;
            }
          }

          // Dentro do horário grade
          if (timeSlotData.startTime >= Number(space.startTime) && timeSlotData.endTime <= Number(space.endTime)) {
            // Tempo mínimo de duração do slot
            if (Math.floor((timeSlotData.endTime - timeSlotData.startTime) * 60) >= space.slotDuration) {
              // Se é um espaço de tempo válido
              if (Math.floor(timeSlotData.endTime * 60 - timeSlotData.startTime * 60) % space.slotDuration === 0) {
                const spaceTimeSlot = await this.addSpaceTimeSlotRepository.add(
                  timeSlotData
                );

                return spaceTimeSlot;
              }
            }
          }
        }
      }
    }

    return null;
  }
}
