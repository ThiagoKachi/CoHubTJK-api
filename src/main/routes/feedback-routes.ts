import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeFeedbackController } from '@main/factories/feedback/add-feedback-controller-factory';
import { makeLoadFeedbacksController } from '@main/factories/feedback/load-feedbacks-controller-factory';
import { auth } from '@main/middlewares/auth';
import { FastifyInstance } from 'fastify';

export async function feedbackRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', auth);
  fastify.post('/feedbacks', adaptRoute(makeFeedbackController()));
  fastify.get('/feedbacks/:reservationId', adaptRoute(makeLoadFeedbacksController()));
}
