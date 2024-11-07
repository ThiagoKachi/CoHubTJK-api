import { AddReservationRepository } from '@data/protocols/db/reservation/add-reservation-repository';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { prismaClient } from '../prismaClient';

export class ReservationPrismaRepository implements AddReservationRepository {
  async add(reservationData: AddReservationModel): Promise<ReservationModel> {
    const reservation = await prismaClient.reservation.create({ data: reservationData });

    return {...reservation, deleted_at: undefined };
  }
}
