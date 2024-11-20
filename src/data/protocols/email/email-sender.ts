import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface EmailSender {
  send(guestInfo: GuestModel, reservation: ReservationModel, token?: string): Promise<void>
}
