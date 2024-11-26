import { ReservationInviteResponseModel } from '@domain/models/reservation/reservation-invite-response';

export interface ReservationInviteResponse {
  changeResponse (response: ReservationInviteResponseModel): Promise<void | null>
}
