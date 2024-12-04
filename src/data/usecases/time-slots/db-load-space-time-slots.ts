import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { LoadSpaceTimeSlotsRepository } from '@data/protocols/db/time-slots/load-space-time-slots-repository';
import { LoadSpaceTimeSlotsModel } from '@domain/models/time-slots/load-space-time-slots';
import { SpaceTimeSlotsModel } from '@domain/models/time-slots/space-time-slots';
import { LoadSpaceTimeSlots } from '@domain/usecases/time-slots/load-space-time-slots';

export class DbLoadSpaceTimeSlots implements LoadSpaceTimeSlots {
  constructor(
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
    private readonly loadSpaceTimeSlotsRepository: LoadSpaceTimeSlotsRepository,
  ) {}

  async load({ accountId, spaceId }: LoadSpaceTimeSlotsModel): Promise<SpaceTimeSlotsModel[] | null> {
    const space = await this.loadSpaceByIdRepository.loadById(spaceId);

    if (space) {
      const isOwner = space.accountId === accountId;

      if (isOwner) {
        const spaceTimeSlots = await this.loadSpaceTimeSlotsRepository.load(spaceId);

        return spaceTimeSlots;
      }
    }

    return null;
  }
}
