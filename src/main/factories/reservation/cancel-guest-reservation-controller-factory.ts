import { DbCancelGuestReservation } from '@data/usecases/reservation/db-cancel-guest-reservation';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { CancelGuestReservationValidatorAdapter } from '@infra/validation/reservation/cancel-guest-reservation-validation-adapter';
import { CancelGuestReservationController } from '@presentation/controllers/reservation/cancel-guest-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeCancelGuestReservationController = (): Controller => {
  const reservationRepository = new ReservationPrismaRepository();
  const cancelGuestReservation = new DbCancelGuestReservation(reservationRepository, reservationRepository);

  const validator = new CancelGuestReservationValidatorAdapter();

  return new CancelGuestReservationController(
    cancelGuestReservation,
    validator
  );
};
