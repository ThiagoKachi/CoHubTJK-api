import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeSpaceController } from '@main/factories/space/add-space-controller-factory';
import { FastifyInstance } from 'fastify';

export async function spaceRoutes(fastify: FastifyInstance) {
  fastify.post('/spaces', adaptRoute(makeSpaceController()));
}
