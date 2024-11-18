import { LoadGuestReservationsRepository } from '@data/protocols/db/reservation/load-guest-reservations';
import { GuestReservationListModel } from '@domain/models/reservation/guest';
import { LoadGuestReservations } from '@domain/usecases/reservation/load-guest-reservations';

export class DbLoadGuestReservations implements LoadGuestReservations {
  constructor(
    private readonly loadGuestReservationsRepository: LoadGuestReservationsRepository,
  ) {}

  async loadGuestReservations(email: string): Promise<GuestReservationListModel | null> {
    const reservations = await this.loadGuestReservationsRepository.loadGuestReservations(email);

    return reservations;
  }
}
