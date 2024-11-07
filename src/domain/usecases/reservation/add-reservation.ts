import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface AddReservation {
  add (reservation: AddReservationModel): Promise<ReservationModel | null>
}
