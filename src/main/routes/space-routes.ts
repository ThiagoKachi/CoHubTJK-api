import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeSpaceController } from '@main/factories/space/add-space-controller-factory';
import { makeDeleteSpaceController } from '@main/factories/space/delete-space-controller-factory';
import { makeLoadSpacesController } from '@main/factories/space/load-spaces-controller-factory';
import { makeUpdateSpaceController } from '@main/factories/space/update-space-controller-factory';
import { adminAuth } from '@main/middlewares/admin-auth';
import { FastifyInstance } from 'fastify';

export async function spaceRoutesPublic(fastify: FastifyInstance) {
  fastify.get('/spaces', adaptRoute(makeLoadSpacesController()));
}

export async function spaceRoutesAdmin(fastify: FastifyInstance) {
  fastify.addHook('onRequest', adminAuth);
  fastify.post('/spaces', adaptRoute(makeSpaceController()));
  fastify.put('/spaces/:spaceId', adaptRoute(makeUpdateSpaceController()));
  fastify.delete('/spaces/:spaceId', adaptRoute(makeDeleteSpaceController()));
}
