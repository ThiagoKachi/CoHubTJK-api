import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeSpaceController } from '@main/factories/space/add-space-controller-factory';
import { makeLoadSpacesController } from '@main/factories/space/load-spaces-controller-factory';
import { FastifyInstance } from 'fastify';

export async function spaceRoutes(fastify: FastifyInstance) {
  fastify.get('/spaces', adaptRoute(makeLoadSpacesController()));
  fastify.post('/spaces', adaptRoute(makeSpaceController()));
}
