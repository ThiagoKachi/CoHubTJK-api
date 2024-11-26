export type ReservationInviteResponseRes = 'accepted' | 'declined' | 'pending';

export interface ReservationInviteResponseModel {
  token: string;
  response: ReservationInviteResponseRes;
}
