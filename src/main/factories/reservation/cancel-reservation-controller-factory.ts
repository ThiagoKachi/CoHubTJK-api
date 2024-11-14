
import { DbCancelReservation } from '@data/usecases/reservation/db-cancel-reservation copy';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { CancelReservationValidatorAdapter } from '@infra/validation/reservation/cancel-reservation-validation-adapter';
import { CancelReservationController } from '@presentation/controllers/reservation/cancel-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeCancelReservationController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const cancelReservation = new DbCancelReservation(reservationRepository, reservationRepository, spaceRepository, reservationRepository);

  const validator = new CancelReservationValidatorAdapter();

  return new CancelReservationController(
    cancelReservation,
    validator
  );
};
