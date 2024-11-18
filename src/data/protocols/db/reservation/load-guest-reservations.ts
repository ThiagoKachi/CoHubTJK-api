import { GuestReservationListModel } from '@domain/models/reservation/guest';

export interface LoadGuestReservationsRepository {
  loadGuestReservations (email: string): Promise<GuestReservationListModel>
}
