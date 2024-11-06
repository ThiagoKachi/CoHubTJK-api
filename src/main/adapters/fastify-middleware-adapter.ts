import { HttpRequest } from '@presentation/protocols/http';
import { Middleware } from '@presentation/protocols/middleware';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      return;
    } else {
      res.status(httpResponse.statusCode).send({
        error: httpResponse.body.error.message
      });
    }
  };
};
