import 'dotenv/config';
//
import FastifyCORS from '@fastify/cors';
import helmet from '@fastify/helmet';
import FastifyJWT from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { env } from '@main/config/env';
import { AppError } from '@presentation/errors/AppError';
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import '../libs/handleBars';
import { appRoutes } from './routes';

export const fastify = Fastify();
fastify.register(helmet, { global: true });
fastify.register(FastifyCORS);
fastify.register(FastifyJWT, {
  secret: env.JWT_SECRET!,
  sign: {
    expiresIn: '1d'
  }
});

fastify.register(rateLimit, {
  global: true,
  max: 80,
  errorResponseBuilder: () => {
    throw new AppError('Too many requests', 429);
  },
});

fastify.register(appRoutes);

fastify.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (err instanceof AppError) {
    reply.status(err.statusCode).send({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);

  if (err instanceof ZodError) {
    return reply.status(400).send({
      status: 'error',
      message: err.issues
    });
  }

  reply.status(500).send({
    status: 'error',
    message: 'Internal server error'
  });

  return reply;
});
