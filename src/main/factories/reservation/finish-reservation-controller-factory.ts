import { DbFinishReservation } from '@data/usecases/reservation/db-finish-reservation';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { FinishReservationValidatorAdapter } from '@infra/validation/finish-reservation-validation-adapter';
import { FinishReservationController } from '@presentation/controllers/reservation/finish-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeFinishReservationController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const finishReservation = new DbFinishReservation(reservationRepository, reservationRepository, spaceRepository);

  const validator = new FinishReservationValidatorAdapter();

  return new FinishReservationController(
    finishReservation,
    validator
  );
};
