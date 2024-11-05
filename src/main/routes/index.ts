import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';
import { spaceRoutes } from './space-routes';

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes);
  fastify.register(spaceRoutes);
}

