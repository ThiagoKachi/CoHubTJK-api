import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId } = await request.jwtVerify() as { userId: string };

    request.userId = userId;
  } catch {
    return reply
      .code(401)
      .send({ error: 'Invalid credentials' });
  }
}
