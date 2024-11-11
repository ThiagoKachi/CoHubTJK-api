import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';

export interface FinishReservationRepository {
  finish (finishReservationData: FinishReservationModel): Promise<void>
}
