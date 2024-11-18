import { AddReservationRepository } from '@data/protocols/db/reservation/add-reservation-repository';
import { CancelReservationRepository } from '@data/protocols/db/reservation/cancel-reservation-repository';
import { FinishReservationRepository } from '@data/protocols/db/reservation/finish-reservation-repository';
import { LoadGuestReservationsRepository } from '@data/protocols/db/reservation/load-guest-reservations';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { LoadReservationGuestsRepository } from '@data/protocols/db/reservation/load-reservation-guests';
import { LoadReservationsRepository } from '@data/protocols/db/reservation/load-reservations';
import { SendReservationInviteRepository } from '@data/protocols/db/reservation/send-reservation-invite';
import { AccountModel } from '@domain/models/account/account';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { CancelReservationModel } from '@domain/models/reservation/cancel-reservation';
import { FinishReservationModel } from '@domain/models/reservation/finish-reservation';
import { GuestModel, GuestReservationListModel } from '@domain/models/reservation/guest';
import { LoadReservationGuestsModel } from '@domain/models/reservation/load-reservation-guests';
import { LoadReservationsModel } from '@domain/models/reservation/load-reservations';
import { ReservationModel } from '@domain/models/reservation/reservation';
import { ReservationInviteModel } from '@domain/models/reservation/reservation-invite';
import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';
import { prismaClient } from '../prismaClient';
export type ReservationBasicInfo = Omit<ReservationModel, 'feedback' | 'space' | 'guests'>;

export class ReservationPrismaRepository
implements
    AddReservationRepository,
    CancelReservationRepository,
    LoadReservationByIdRepository,
    FinishReservationRepository,
    LoadReservationsRepository,
    SendReservationInviteRepository,
    LoadReservationGuestsRepository,
    LoadGuestReservationsRepository
{
  async loadGuestReservations(email: string): Promise<GuestReservationListModel> {
    const reservations = await prismaClient.guest.findUnique({
      where: { email },
      include: {
        reservation: {
          include: {
            reservation: { include: { space: true } },
          },
        },
      },
    });

    return reservations ? reservations as any : [];
  }

  async loadGuests({
    reservationId,
  }: LoadReservationGuestsModel): Promise<GuestModel[] | null> {
    const guests = await prismaClient.reservationGuest.findMany({
      where: { reservationId },
      include: { guest: true },
    });

    return guests.map((guest) => ({
      ...guest.guest,
      email: guest.guest.email,
    }));
  }

  async send(
    inviteData: SendReservationInviteModel
  ): Promise<ReservationInviteModel[] | null> {
    const guests = [];

    for (const guestData of inviteData.guests) {
      let guest = await prismaClient.guest.findFirst({
        where: { email: guestData.email },
      });

      if (!guest) {
        guest = await prismaClient.guest.create({ data: guestData });
      }

      guests.push(guest);
    }

    await prismaClient.reservationGuest.createMany({
      data: guests.map((guest) => ({
        reservationId: inviteData.reservationId,
        guestId: guest.id,
      })),
    });

    return guests;
  }

  async load({
    accountId,
  }: LoadReservationsModel): Promise<ReservationModel[] | null> {
    const reservations = await prismaClient.reservation.findMany({
      where: { accountId: accountId },
      include: { feedback: true },
    });

    return reservations.map((reservation) => {
      return {
        ...reservation,
        feedback: reservation?.feedback.map((feedback) => ({
          ...feedback,
          created_at: feedback.created_at.toISOString(),
        })),
      };
    });
  }

  async finish(reservationData: FinishReservationModel): Promise<void> {
    await prismaClient.reservation.update({
      where: { id: reservationData.reservationId },
      data: { finished_at: new Date() },
    });
  }

  async cancel(cancelReservationData: CancelReservationModel): Promise<void> {
    await prismaClient.reservation.update({
      where: { id: cancelReservationData.reservationId },
      data: { deleted_at: new Date() },
    });
  }

  async loadById(id: string): Promise<ReservationModel | null> {
    const reservation = await prismaClient.reservation.findFirst({
      where: { id },
      include: {
        feedback: true,
        space: true,
        guests: {
          include: {
            guest: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    return (
      reservation && {
        ...reservation,
        feedback: reservation?.feedback.map((feedback) => ({
          ...feedback,
          created_at: feedback.created_at.toISOString(),
        })),
        space: {
          ...reservation.space,
          price: Number(reservation.space.price),
          created_at: new Date(reservation.space.created_at).toISOString(),
          updated_at: new Date(reservation.space.updated_at).toISOString(),
          complement:
            reservation.space.complement === null
              ? undefined
              : reservation.space.complement,
        },
        guests: reservation.guests.map((guest) => {
          const newGuest = {
            id: guest.id,
            guestId: guest.guestId,
            reservationId: guest.reservationId,
            email: guest.guest.email,
          };

          return {
            ...newGuest,
          };
        }),
      }
    );
  }

  async add(
    reservationData: AddReservationModel,
    account: AccountModel
  ): Promise<ReservationModel> {
    const reservation = await prismaClient.reservation.create({
      data: reservationData,
    });

    let guest = await prismaClient.guest.findFirst({
      where: { email: account.email },
    });

    if (!guest) {
      guest = await prismaClient.guest.create({
        data: { email: account.email, name: account.name },
      });
    }

    await prismaClient.reservationGuest.create({
      data: { reservationId: reservation.id, guestId: guest.id },
    });

    return { ...reservation, deleted_at: undefined };
  }
}
