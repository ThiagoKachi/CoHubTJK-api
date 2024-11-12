import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeReservationController } from '@main/factories/reservation/add-reservation-controller-factory';
import { makeCancelReservationController } from '@main/factories/reservation/cancel-reservation-controller-factory';
import { makeFinishReservationController } from '@main/factories/reservation/finish-reservation-controller-factory';
import { makeLoadReservationsController } from '@main/factories/reservation/load-reservations-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function reservationRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/reservations', adaptRoute(makeReservationController()));
  fastify.delete('/reservations/:id', adaptRoute(makeCancelReservationController()));
  fastify.post('/reservations/finish', adaptRoute(makeFinishReservationController()));
  fastify.get('/reservations', adaptRoute(makeLoadReservationsController()));
}
