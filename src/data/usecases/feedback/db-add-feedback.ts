import { Decrypter } from '@data/protocols/cryptography/decrypter';
import { AddFeedbackRepository } from '@data/protocols/db/feedback/add-feedback-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { AddFeedbackRequestModel } from '@domain/models/feedback/add-feedback';
import { GuestReservationModel } from '@domain/models/reservation/guest';
import { AddFeedback } from '@domain/usecases/feedback/add-feedback';

export class DbAddFeedback implements AddFeedback {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly addFeedbackRepository: AddFeedbackRepository,
    private readonly decrypter: Decrypter,
  ) {}

  async add(feedbackData: AddFeedbackRequestModel): Promise<void | null> {
    const { guest } = await this.decrypter.decrypt(feedbackData.token) as any as { guest: GuestReservationModel };

    const reservation = await this.loadReservationByIdRepository.loadById(guest.reservationId);

    const reservationExists = reservation && reservation.finished_at === null && reservation.deleted_at === null;
    if (reservationExists) {
      const guestExistsInReservation = reservation.guests?.find((guestReserve) => guestReserve.email === guest.email);

      if (guestExistsInReservation) {
        const feedbackExists = reservation.feedback?.find((userFeedback) => userFeedback.guestId === guest.guestId);

        if (!feedbackExists) {
          await this.addFeedbackRepository.add({
            rating: feedbackData.rating,
            feedback: feedbackData.feedback,
            reservationId: guest.reservationId,
            guestId: guest.guestId,
            spaceId: reservation.spaceId,
          });

          return;
        }
      }
    }

    return null;
  }
}
