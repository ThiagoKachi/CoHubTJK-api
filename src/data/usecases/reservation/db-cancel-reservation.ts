import { CancelReservationRepository } from '@data/protocols/db/reservation/cancel-reservation-repository';
import { FinishReservationRepository } from '@data/protocols/db/reservation/finish-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { UpdateSpaceAvailabilityRepository } from '@data/protocols/db/space/update-space-availability-repository';
import { CancelReservationEmailSender } from '@data/protocols/email/cancel-reservation';
import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { CancelReservation } from '@domain/usecases/reservation/cancel-reservation';

export class DbCancelReservation implements CancelReservation {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly cancelReservationRepository: CancelReservationRepository,
    private readonly updateSpaceAvailabilityRepository: UpdateSpaceAvailabilityRepository,
    private readonly finishReservationRepository: FinishReservationRepository,
    private readonly cancelReservationEmailSender: CancelReservationEmailSender,
  ) {}

  async cancel(cancelReservationData: CancelReservationModel): Promise<void | null> {
    const reservation = await this.loadReservationByIdRepository.loadById(cancelReservationData.reservationId);

    if (reservation && reservation.deleted_at === null) {
      if (cancelReservationData.accountId === reservation?.accountId) {
        await this.cancelReservationRepository.cancel(cancelReservationData);

        await this.updateSpaceAvailabilityRepository.updateSpaceAvailability(reservation.spaceId, true);

        await this.finishReservationRepository.finish({
          accountId: cancelReservationData.accountId,
          reservationId: cancelReservationData.reservationId
        });

        for (const guest of reservation.guests!) {
          await this.cancelReservationEmailSender.send(reservation, guest);
        }

        return;
      }
    }

    return null;
  }
}
