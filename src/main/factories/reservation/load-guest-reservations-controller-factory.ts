import { DbLoadGuestReservations } from '@data/usecases/reservation/db-load-guest-reservations';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { LoadGuestReservationsController } from '@presentation/controllers/reservation/load-guest-reservations-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadGuestReservationsController = (): Controller => {
  const reservationPrismaRepository = new ReservationPrismaRepository();
  const loadReservationGuests = new DbLoadGuestReservations(reservationPrismaRepository);

  return new LoadGuestReservationsController(
    loadReservationGuests,
  );
};
