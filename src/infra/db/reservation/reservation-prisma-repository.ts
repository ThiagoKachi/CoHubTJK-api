import { AddReservationRepository } from '@data/protocols/db/reservation/add-reservation-repository';
import { CancelReservationRepository } from '@data/protocols/db/reservation/cancel-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { prismaClient } from '../prismaClient';

export class ReservationPrismaRepository implements AddReservationRepository, CancelReservationRepository, LoadReservationByIdRepository {
  async cancel(cancelReservationData: CancelReservationModel): Promise<void> {
    await prismaClient.reservation.update({ where: { id: cancelReservationData.reservationId }, data: { deleted_at: new Date() } });
  }

  async loadById(id: string): Promise<ReservationModel | null> {
    const reservation = await prismaClient.reservation.findFirst({ where: { id } });

    return reservation;
  }

  async add(reservationData: AddReservationModel): Promise<ReservationModel> {
    const reservation = await prismaClient.reservation.create({ data: reservationData });

    return {...reservation, deleted_at: undefined };
  }
}
