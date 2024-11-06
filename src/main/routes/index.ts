import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';
import { spaceRoutesAdmin, spaceRoutesPublic } from './space-routes';

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes);
  fastify.register(spaceRoutesPublic);
  fastify.register(spaceRoutesAdmin);
}

