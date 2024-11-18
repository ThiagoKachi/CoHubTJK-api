import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeReservationController } from '@main/factories/reservation/add-reservation-controller-factory';
import { makeCancelReservationController } from '@main/factories/reservation/cancel-reservation-controller-factory';
import { makeFinishReservationController } from '@main/factories/reservation/finish-reservation-controller-factory';
import { makeLoadReservationGuestsController } from '@main/factories/reservation/load-reservation-guests-controller-factory';
import { makeLoadReservationsController } from '@main/factories/reservation/load-reservations-controller-factory';
import { makeSendReservationInviteController } from '@main/factories/reservation/send-reservation-invite-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function reservationRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/reservations', adaptRoute(makeReservationController()));
  fastify.delete('/reservations/:id', adaptRoute(makeCancelReservationController()));
  fastify.post('/reservations/finish', adaptRoute(makeFinishReservationController()));
  fastify.post('/reservations/:id/invite', adaptRoute(makeSendReservationInviteController()));
  fastify.get('/reservations', adaptRoute(makeLoadReservationsController()));
  fastify.get('/reservations/:id/guests', adaptRoute(makeLoadReservationGuestsController()));
}
