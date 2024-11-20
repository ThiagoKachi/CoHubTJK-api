import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { SendReservationInviteRepository } from '@data/protocols/db/reservation/send-reservation-invite';
import { EmailSender } from '@data/protocols/email/email-sender';
import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';
import { SendReservationInvite } from '@domain/usecases/reservation/send-reservation-invite';

export class DbSendReservationInvite implements SendReservationInvite {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly sendReservationInviteRepository: SendReservationInviteRepository,
    private readonly sendInviteEmailService: EmailSender,
  ) {}

  async send(reservationInvite: SendReservationInviteModel): Promise<void | null> {
    const account = await this.loadAccountByIdRepository.loadById(reservationInvite.accountId);

    if (account) {
      const reservation = await this.loadReservationByIdRepository.loadById(reservationInvite.reservationId);

      if (reservation && reservation.deleted_at === null && reservation.finished_at === null) {
        if (reservation.accountId === reservationInvite.accountId) {
          const spaceCapacity = reservation.space?.capacity ?? 1;

          if ((reservationInvite.guests.length + (reservation.guests?.length ?? 0)) <= (spaceCapacity)) {
            const invites = [reservationInvite.guests, reservation.guests].flat();
            const guestsWithSameEmail = new Set(invites.map(guest => guest?.email)).size !== invites.length;

            if (!guestsWithSameEmail) {
              await this.sendReservationInviteRepository.send(reservationInvite);

              await Promise.all(
                reservationInvite.guests.map((guest) =>
                  this.sendInviteEmailService.send(guest, reservation)
                )
              );

              return;
            }
          }
        }
      }
    }

    return null;
  }
}
