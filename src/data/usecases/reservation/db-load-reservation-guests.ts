import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { LoadReservationGuestsRepository } from '@data/protocols/db/reservation/load-reservation-guests';
import { GuestModel } from '@domain/models/reservation/guest';
import { LoadReservationGuestsModel } from '@domain/models/reservation/load-reservation-guests';
import { LoadReservationGuests } from '@domain/usecases/reservation/load-reservation-guests';

export class DbLoadReservationGuests implements LoadReservationGuests {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly loadReservationGuestsRepository: LoadReservationGuestsRepository
  ) {}

  async loadGuests({ accountId, reservationId }: LoadReservationGuestsModel): Promise<GuestModel[] | null> {
    const reservation = await this.loadReservationByIdRepository.loadById(reservationId);

    const reservationFinished = reservation?.finished_at !== null || reservation?.deleted_at !== null;

    if ((reservation?.accountId === accountId) && !reservationFinished) {
      const guests = await this.loadReservationGuestsRepository.loadGuests({ accountId, reservationId });

      return guests;
    }

    return null;
  }
}
