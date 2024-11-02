import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes);
}

