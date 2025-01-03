import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AddReservationRepository } from '@data/protocols/db/reservation/add-reservation-repository';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { UpdateSpaceAvailabilityRepository } from '@data/protocols/db/space/update-space-availability-repository';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { AddReservation } from '@domain/usecases/reservation/add-reservation';

export class DbAddReservation implements AddReservation {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
    private readonly addReservationRepository: AddReservationRepository,
    private readonly updateSpaceAvailabilityRepository: UpdateSpaceAvailabilityRepository,
  ) {}

  async add(reservation: AddReservationModel): Promise<ReservationModel | null> {
    const account = await this.loadAccountByIdRepository.loadById(reservation.accountId);

    if (account) {
      const space = await this.loadSpaceByIdRepository.loadById(reservation.spaceId);

      if (space) {
        const isAvailable = space.available;

        if (isAvailable) {
          const reservationRes = await this.addReservationRepository.add(reservation, account);

          await this.updateSpaceAvailabilityRepository.updateSpaceAvailability(reservation.spaceId, false);

          return reservationRes;
        }
      }
    }

    return null;
  }
}
