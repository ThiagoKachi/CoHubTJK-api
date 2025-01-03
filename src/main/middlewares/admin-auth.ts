import { adaptMiddleware } from '@main/adapters/fastify-middleware-adapter';
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-middleware-factory';

export const adminAuth = adaptMiddleware(makeAuthMiddleware('ADMIN'));
