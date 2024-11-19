import { CancelGuestReservationModel } from '@domain/models/reservation/cancel-guest-reservation';

export interface CancelGuestReservation {
  cancelGuestReservation (cancelGuestReservationData: CancelGuestReservationModel): Promise<void | null>
}
