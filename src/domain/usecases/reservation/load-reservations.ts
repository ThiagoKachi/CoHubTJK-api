import { LoadReservationsModel } from '@domain/models/reservation/load-reservations';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface LoadReservations {
  load ({ accountId }: LoadReservationsModel): Promise<ReservationModel[] | null>
}
