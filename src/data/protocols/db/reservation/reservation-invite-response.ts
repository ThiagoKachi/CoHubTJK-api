export interface ReservationInviteResponseRepository {
  changeResponse (email: string, response: string): Promise<void | null>
}
