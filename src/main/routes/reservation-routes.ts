import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeReservationController } from '@main/factories/reservation/add-space-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function reservationRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/reservation', adaptRoute(makeReservationController()));
}
