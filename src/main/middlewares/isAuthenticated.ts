import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { accountId } = await request.jwtVerify() as { accountId: string };

    request.accountId = accountId;
  } catch {
    return reply
      .code(401)
      .send({ error: 'Invalid credentials' });
  }
}
