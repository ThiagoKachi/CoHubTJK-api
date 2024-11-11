import { AddReservationRepository } from '@data/protocols/db/reservation/add-reservation-repository';
import { CancelReservationRepository } from '@data/protocols/db/reservation/cancel-reservation-repository';
import { FinishReservationRepository } from '@data/protocols/db/reservation/finish-reservation-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { prismaClient } from '../prismaClient';

export class ReservationPrismaRepository implements AddReservationRepository, CancelReservationRepository, LoadReservationByIdRepository, FinishReservationRepository {
  async finish(reservationData: FinishReservationModel): Promise<void> {
    await prismaClient.reservation.update({ where: { id: reservationData.reservationId }, data: { finished_at: new Date() } });
  }

  async cancel(cancelReservationData: CancelReservationModel): Promise<void> {
    await prismaClient.reservation.update({ where: { id: cancelReservationData.reservationId }, data: { deleted_at: new Date() } });
  }

  async loadById(id: string): Promise<ReservationModel | null> {
    const reservation = await prismaClient.reservation.findFirst({ where: { id }, include: { feedback: true } });

    return reservation && {
      ...reservation,
      feedback: reservation?.feedback.map((feedback) => ({ ...feedback, created_at: feedback.created_at.toISOString() })),
    };
  }

  async add(reservationData: AddReservationModel): Promise<ReservationModel> {
    const reservation = await prismaClient.reservation.create({ data: reservationData });

    return {...reservation, deleted_at: undefined };
  }
}
