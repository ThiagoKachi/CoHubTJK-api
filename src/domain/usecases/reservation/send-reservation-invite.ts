import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';

export interface SendReservationInvite {
  send (inviteData: SendReservationInviteModel): Promise<void | null>
}
