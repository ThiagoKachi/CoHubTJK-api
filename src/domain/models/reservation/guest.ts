import { ReservationModel } from './reservation';
import { ReservationInviteResponseRes } from './reservation-invite-response';

export interface GuestModel {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}

export interface GuestReservationModel {
  id: string;
  reservationId: string;
  guestId: string;
  email: string;
  name: string;
  created_at: Date;
  invite_status: ReservationInviteResponseRes;
}

export interface GuestReservationListModel {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  reservation: {
    id: string;
    reservationId: string;
    guestId: string;
    reservation: ReservationModel
  }[];
}
