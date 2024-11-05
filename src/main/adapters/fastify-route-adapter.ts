import { Controller } from '@presentation/protocols/controller';
import { HttpRequest } from '@presentation/protocols/http';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId,
      query: req.query
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      });
    }
  };
};
