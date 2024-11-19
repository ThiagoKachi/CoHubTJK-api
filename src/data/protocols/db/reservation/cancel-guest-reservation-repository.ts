import { CancelGuestReservationModel } from '@domain/models/reservation/cancel-guest-reservation';

export interface CancelGuestReservationRepository {
  cancelGuestReservation (cancelGuestReservationData: CancelGuestReservationModel): Promise<void>
}
