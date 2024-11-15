import { GuestModel } from './guest';

export interface SendReservationInviteModel {
  accountId: string;
  reservationId: string;
  guests: GuestModel[]
}
