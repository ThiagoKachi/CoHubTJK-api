import { DbFinishReservation } from '@data/usecases/reservation/db-finish-reservation';
import { JWTAdapter } from '@infra/cryptography/jwt-adapter';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { SendInviteEmailService } from '@infra/email/send-feedback-request';
import { FinishReservationValidatorAdapter } from '@infra/validation/reservation/finish-reservation-validation-adapter';
import { env } from '@main/config/env';
import { FinishReservationController } from '@presentation/controllers/reservation/finish-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeFinishReservationController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const sendInviteEmailService = new SendInviteEmailService();
  const encrypter = new JWTAdapter(env.JWT_SECRET!);
  const finishReservation = new DbFinishReservation(reservationRepository, reservationRepository, spaceRepository, sendInviteEmailService, encrypter);

  const validator = new FinishReservationValidatorAdapter();

  return new FinishReservationController(
    finishReservation,
    validator
  );
};
