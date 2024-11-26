import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeReservationController } from '@main/factories/reservation/add-reservation-controller-factory';
import { makeCancelGuestReservationController } from '@main/factories/reservation/cancel-guest-reservation-controller-factory';
import { makeCancelReservationController } from '@main/factories/reservation/cancel-reservation-controller-factory';
import { makeFinishReservationController } from '@main/factories/reservation/finish-reservation-controller-factory';
import { makeLoadGuestReservationsController } from '@main/factories/reservation/load-guest-reservations-controller-factory';
import { makeLoadReservationGuestsController } from '@main/factories/reservation/load-reservation-guests-controller-factory';
import { makeLoadReservationsController } from '@main/factories/reservation/load-reservations-controller-factory';
import { makeReservationInviteResponseController } from '@main/factories/reservation/reservation-invite-response-controller-factory';
import { makeSendReservationInviteController } from '@main/factories/reservation/send-reservation-invite-controller-factory';
import { adminAuth } from '@main/middlewares/admin-auth';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function reservationAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', adminAuth);
  fastify.post('/reservations/:id/guest/cancel', adaptRoute(makeCancelGuestReservationController()));
}

export async function reservationRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/reservations', adaptRoute(makeReservationController()));
  fastify.delete('/reservations/:id', adaptRoute(makeCancelReservationController()));
  fastify.post('/reservations/finish', adaptRoute(makeFinishReservationController()));
  fastify.post('/reservations/:id/invite', adaptRoute(makeSendReservationInviteController()));
  fastify.get('/reservations', adaptRoute(makeLoadReservationsController()));
  fastify.post('/reservations/guests', adaptRoute(makeLoadGuestReservationsController()));
  fastify.get('/reservations/:id/guests', adaptRoute(makeLoadReservationGuestsController()));
  fastify.post('/reservations/guest/invite-response', adaptRoute(makeReservationInviteResponseController()));
}
