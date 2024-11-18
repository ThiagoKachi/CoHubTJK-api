import { ReservationModel } from './reservation';

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
