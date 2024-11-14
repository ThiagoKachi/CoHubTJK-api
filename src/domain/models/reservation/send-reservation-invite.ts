export interface SendReservationInviteModel {
  accountId: string;
  reservationId: string;
  guests: {
    email: string;
    name: string;
  }[]
}
