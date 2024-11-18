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
