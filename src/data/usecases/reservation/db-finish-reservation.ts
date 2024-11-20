import { Encrypter } from '@data/protocols/cryptography/encrypter';
import { FinishReservationRepository } from '@data/protocols/db/reservation/finish-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { UpdateSpaceAvailabilityRepository } from '@data/protocols/db/space/update-space-availability-repository';
import { EmailSender } from '@data/protocols/email/email-sender';
import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';
import { FinishReservation } from '@domain/usecases/reservation/finish-reservation';

export class DbFinishReservation implements FinishReservation {
  constructor(
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly finishReservationRepository: FinishReservationRepository,
    private readonly updateSpaceAvailabilityRepository: UpdateSpaceAvailabilityRepository,
    private readonly sendEmailService: EmailSender,
    private readonly encrypter: Encrypter,
  ) {}

  async finish(finishReservationData: FinishReservationModel): Promise<void | null> {
    const reservation = await this.loadReservationByIdRepository.loadById(finishReservationData.reservationId);

    if (reservation && reservation.deleted_at === null && reservation.finished_at === null) {
      if (finishReservationData.accountId === reservation?.accountId) {
        await this.finishReservationRepository.finish(finishReservationData);

        await this.updateSpaceAvailabilityRepository.updateSpaceAvailability(reservation.spaceId, true);

        for (const guest of reservation.guests!) {
          const token = await this.encrypter.encrypt(JSON.stringify({ guest }));

          await this.sendEmailService.send({
            created_at: guest.created_at,
            id: guest.id,
            email: guest.email,
            name: guest.name
          }, reservation, token);
        }

        return;
      }
    }

    return null;
  }
}
