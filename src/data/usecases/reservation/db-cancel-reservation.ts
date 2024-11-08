import { CancelReservationRepository } from '@data/protocols/db/reservation/cancel-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { UpdateSpaceRepository } from '@data/protocols/db/space/update-space-repository';
import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { CancelReservation } from '@domain/usecases/reservation/cancel-reservation';

export class DbCancelReservation implements CancelReservation {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly cancelReservationRepository: CancelReservationRepository,
    private readonly updateSpaceRepository: UpdateSpaceRepository
  ) {}

  async cancel(cancelReservationData: CancelReservationModel): Promise<void | null> {
    const reservation = await this.loadReservationByIdRepository.loadById(cancelReservationData.reservationId);

    if (reservation && reservation.deleted_at === null) {
      if (cancelReservationData.accountId === reservation?.accountId) {
        await this.cancelReservationRepository.cancel(cancelReservationData);

        await this.updateSpaceRepository.updateSpace(cancelReservationData.spaceId, true);

        return;
      }
    }

    return null;
  }
}
