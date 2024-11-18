import { GuestReservationListModel } from '@domain/models/reservation/guest';

export interface LoadGuestReservations {
  loadGuestReservations (email: string): Promise<GuestReservationListModel | null>
}
