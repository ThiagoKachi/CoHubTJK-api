import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeSignUpController } from '@main/factories/account/add-account-controller-factory';
import { makeLoginController } from '@main/factories/account/login-controller-factory';
import { FastifyInstance } from 'fastify';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/sign-up', adaptRoute(makeSignUpController()));
  fastify.post('/auth/sign-in', adaptRoute(makeLoginController()));
}
