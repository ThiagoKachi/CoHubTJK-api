import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeReservationController } from '@main/factories/reservation/add-reservation-controller-factory';
import { makeCancelReservationController } from '@main/factories/reservation/cancel-reservation-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function reservationRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/reservation', adaptRoute(makeReservationController()));
  fastify.delete('/reservation/:id', adaptRoute(makeCancelReservationController()));
}
