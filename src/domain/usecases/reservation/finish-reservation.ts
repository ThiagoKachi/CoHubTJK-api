import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';

export interface FinishReservation {
  finish (reservation: FinishReservationModel): Promise<void | null>
}
