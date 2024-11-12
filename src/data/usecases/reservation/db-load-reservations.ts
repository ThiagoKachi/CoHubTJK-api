import { LoadReservationsRepository } from '@data/protocols/db/reservation/load-reservations';
import { LoadReservationsModel } from '@domain/models/reservation/load-reservations';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { LoadReservations } from '@domain/usecases/reservation/load-reservations';

export class DbLoadReservations implements LoadReservations {
  constructor(private readonly loadReservationsRepository: LoadReservationsRepository) {}

  async load({ accountId }: LoadReservationsModel): Promise<ReservationModel[] | null> {
    const reservations = await this.loadReservationsRepository.load({ accountId });

    return reservations;
  }
}
