import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';

export interface CancelReservationRepository {
  cancel (cancelReservationData: CancelReservationModel): Promise<void>
}
