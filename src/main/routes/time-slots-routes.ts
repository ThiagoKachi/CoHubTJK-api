import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeAddSpaceTimeSlotController } from '@main/factories/time-slots/add-space-time-slot-controller-factory';
import { makeLoadSpaceTimeSlotsController } from '@main/factories/time-slots/load-space-time-slots-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function spaceTimeSlotsRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);

  fastify.get('/time-slots/:spaceId', adaptRoute(makeLoadSpaceTimeSlotsController()));
  fastify.post('/time-slots/:spaceId', adaptRoute(makeAddSpaceTimeSlotController()));
}
