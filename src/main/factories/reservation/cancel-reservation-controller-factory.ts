import { DbCancelReservation } from '@data/usecases/reservation/db-cancel-reservation';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { CancelReservationEmailService } from '@infra/email/cancel-reservation-email';
import { CancelReservationController } from '@presentation/controllers/reservation/cancel-reservation-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeCancelReservationController = (): Controller => {
  const spaceRepository = new SpacePrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const cancelReservationEmailService = new CancelReservationEmailService();
  const cancelReservation = new DbCancelReservation(reservationRepository, reservationRepository, spaceRepository, reservationRepository, cancelReservationEmailService);

  return new CancelReservationController(cancelReservation);
};
