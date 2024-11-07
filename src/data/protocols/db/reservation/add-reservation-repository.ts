import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface AddReservationRepository {
  add (reservationData: AddReservationModel): Promise<ReservationModel>
}
