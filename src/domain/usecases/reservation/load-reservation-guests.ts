import { GuestModel } from '@domain/models/reservation/guest';
import { LoadReservationGuestsModel } from '@domain/models/reservation/load-reservation-guests';

export interface LoadReservationGuests {
  loadGuests ({ accountId, reservationId }: LoadReservationGuestsModel): Promise<GuestModel[] | null>
}
