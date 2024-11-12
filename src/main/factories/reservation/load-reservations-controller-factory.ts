import { DbLoadReservations } from '@data/usecases/reservation/db-load-reservations';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { LoadReservationsController } from '@presentation/controllers/reservation/load-reservations-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadReservationsController = (): Controller => {
  const reservationPrismaRepository = new ReservationPrismaRepository();
  const loadReservations = new DbLoadReservations(reservationPrismaRepository);

  return new LoadReservationsController(
    loadReservations,
  );
};
