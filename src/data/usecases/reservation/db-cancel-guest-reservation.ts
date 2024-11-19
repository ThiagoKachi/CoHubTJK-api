import { CancelGuestReservationRepository } from '@data/protocols/db/reservation/cancel-guest-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { CancelGuestReservationModel } from '@domain/models/reservation/cancel-guest-reservation';
import { CancelGuestReservation } from '@domain/usecases/reservation/cancel-guest-reservation';

export class DbCancelGuestReservation implements CancelGuestReservation {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly cancelGuestReservationRepository: CancelGuestReservationRepository,
  ) {}

  async cancelGuestReservation(cancelGuestReservationData: CancelGuestReservationModel): Promise<void | null> {
    const reservation = await this.loadReservationByIdRepository.loadById(cancelGuestReservationData.reservationId);

    const reservationExists = reservation?.deleted_at === null && reservation.finished_at === null;

    if (reservationExists && reservation?.accountId === cancelGuestReservationData.accountId) {
      const emailToCancelReservation = reservation.guests?.find((guest) => guest.email === cancelGuestReservationData.email);

      if (emailToCancelReservation) {
        await this.cancelGuestReservationRepository.cancelGuestReservation(cancelGuestReservationData);

        return;
      }
    }

    return null;
  }
}
