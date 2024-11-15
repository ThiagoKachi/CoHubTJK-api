export interface GuestModel {
  email: string;
  name: string;
}

export interface GuestReservationModel {
  id: string;
  reservationId: string;
  guestId: string;
}
