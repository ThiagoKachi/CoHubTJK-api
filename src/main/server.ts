import { fastify } from '.';

const port = Number(process.env.PORT) || 3333;

fastify.listen({ port, host: '0.0.0.0' }, () => {
  console.log(`🚀 Server running on port ${port}`);
});
