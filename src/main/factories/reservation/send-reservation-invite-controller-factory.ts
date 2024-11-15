import { DbSendReservationInvite } from '@data/usecases/reservation/db-send-reservation-invite';
import { AccountPrismaRepository } from '@infra/db/account/account-prisma-repository';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SendInviteEmailService } from '@infra/email/send-invite';
import { SendReservationInvitesValidatorAdapter } from '@infra/validation/reservation/send-reservation-invites-validation-adapter';
import { SendReservationInviteController } from '@presentation/controllers/reservation/send-reservation-invite-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeSendReservationInviteController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const sendInviteEmailService = new SendInviteEmailService();
  const sendInvite = new DbSendReservationInvite(accountRepository,reservationRepository, reservationRepository, sendInviteEmailService);

  const validator = new SendReservationInvitesValidatorAdapter();

  return new SendReservationInviteController(
    sendInvite,
    validator
  );
};
