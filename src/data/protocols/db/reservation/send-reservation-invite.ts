import { ReservationInviteModel } from '@domain/models/reservation/reservation-invite';
import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';

export interface SendReservationInviteRepository {
  send (inviteData: SendReservationInviteModel): Promise<ReservationInviteModel[] | null>
}
