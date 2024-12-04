import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';
import { feedbackRoutes } from './feedback-routes';
import { reservationAdminRoutes, reservationRoutes } from './reservation-routes';
import { spaceRoutesAdmin, spaceRoutesPublic } from './space-routes';
import { spaceTimeSlotsRoutes } from './time-slots-routes';

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes);
  fastify.register(spaceRoutesPublic);
  fastify.register(spaceRoutesAdmin);
  fastify.register(reservationRoutes);
  fastify.register(reservationAdminRoutes);
  fastify.register(feedbackRoutes);
  fastify.register(spaceTimeSlotsRoutes);
}

