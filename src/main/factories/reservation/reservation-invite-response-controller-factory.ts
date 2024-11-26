import { DbReservationInviteResponse } from '@data/usecases/reservation/db-reservation-invite-response';
import { JWTAdapter } from '@infra/cryptography/jwt-adapter';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { ReservationInviteResponseValidatorAdapter } from '@infra/validation/reservation/reservation-invite-response-validation-adapter';
import { env } from '@main/config/env';
import { ReservationInviteResponseController } from '@presentation/controllers/reservation/reservation-invite-response-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeReservationInviteResponseController = (): Controller => {
  const reservationRepository = new ReservationPrismaRepository();
  const encrypter = new JWTAdapter(env.JWT_SECRET!);
  const sendInvite = new DbReservationInviteResponse(reservationRepository, reservationRepository, encrypter);

  const validator = new ReservationInviteResponseValidatorAdapter();

  return new ReservationInviteResponseController(
    sendInvite,
    validator
  );
};
