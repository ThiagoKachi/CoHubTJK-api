import { adaptRoute } from '@main/adapters/fastify-route-adapter';
import { makeSignUpController } from '@main/factories/account/add-account-factory';
import { FastifyInstance } from 'fastify';

const signUpController = makeSignUpController();

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/sign-up', adaptRoute(signUpController));
}
