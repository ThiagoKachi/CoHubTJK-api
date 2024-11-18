import { DbLoadReservationGuests } from '@data/usecases/reservation/db-load-reservation-guests';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { LoadReservationGuestsController } from '@presentation/controllers/reservation/load-reservation-guests-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadReservationGuestsController = (): Controller => {
  const reservationPrismaRepository = new ReservationPrismaRepository();
  const loadReservationGuests = new DbLoadReservationGuests(reservationPrismaRepository, reservationPrismaRepository);

  return new LoadReservationGuestsController(
    loadReservationGuests,
  );
};
