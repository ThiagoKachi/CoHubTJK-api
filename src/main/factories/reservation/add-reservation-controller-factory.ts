import { DbAddReservation } from '@data/usecases/reservation/db-add-reservation';
import { AccountPrismaRepository } from '@infra/db/account/account-prisma-repository';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { AddReservationValidatorAdapter } from '@infra/validation/reservation/create-reservation-validation-adapter';
import { AddReservationController } from '@presentation/controllers/reservation/add-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeReservationController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const addSpace = new DbAddReservation(accountRepository, spaceRepository, reservationRepository, spaceRepository);

  const validator = new AddReservationValidatorAdapter();

  return new AddReservationController(
    addSpace,
    validator
  );
};
