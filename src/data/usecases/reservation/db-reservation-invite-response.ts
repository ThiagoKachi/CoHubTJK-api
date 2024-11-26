import { Decrypter } from '@data/protocols/cryptography/decrypter';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { ReservationInviteResponseRepository } from '@data/protocols/db/reservation/reservation-invite-response';
import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { ReservationInviteResponseModel } from '@domain/models/reservation/reservation-invite-response';
import { ReservationInviteResponse } from '@domain/usecases/reservation/reservation-invite-response';

export class DbReservationInviteResponse implements ReservationInviteResponse {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly reservationInviteResponseRepository: ReservationInviteResponseRepository,
    private readonly decrypter: Decrypter
  ) {}

  async changeResponse(responseData: ReservationInviteResponseModel): Promise<void | null> {
    const { guest, reservation } = await this.decrypter.decrypt(responseData.token) as any as { guest: GuestModel, reservation: ReservationModel };

    const reservationData = await this.loadReservationByIdRepository.loadById(reservation.id);

    if (reservationData && reservationData.deleted_at === null && reservationData.finished_at === null) {
      const userExistsInReservation = reservationData.guests?.find((user) => user.email === guest.email);

      if (userExistsInReservation) {
        const userAlreadyAnswered = userExistsInReservation.invite_status === 'accepted' || userExistsInReservation.invite_status === 'declined';

        if (!userAlreadyAnswered) {
          await this.reservationInviteResponseRepository.changeResponse(guest.email, responseData.response);

          return;
        }
      }
    }

    return null;
  }
}
