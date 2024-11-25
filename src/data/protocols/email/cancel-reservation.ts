import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface CancelReservationEmailSender {
  send(reservation: ReservationModel, guest: GuestModel): Promise<void>
}
