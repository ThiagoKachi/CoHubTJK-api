import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';

export interface CancelReservation {
  cancel (reservation: CancelReservationModel): Promise<void | null>
}
