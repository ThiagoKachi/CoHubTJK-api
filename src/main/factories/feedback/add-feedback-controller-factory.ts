import { DbAddFeedback } from '@data/usecases/feedback/db-add-feedback';
import { JWTAdapter } from '@infra/cryptography/jwt-adapter';
import { FeedbackPrismaRepository } from '@infra/db/feedback/feedback-prisma-repository';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { AddFeedbackValidatorAdapter } from '@infra/validation/feedback/create-feedback-validation-adapter';
import { env } from '@main/config/env';
import { AddFeedbackController } from '@presentation/controllers/feedback/add-feedback-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeFeedbackController = (): Controller => {
  const reservationRepository = new ReservationPrismaRepository();
  const feedbackPrismaRepository = new FeedbackPrismaRepository();
  const jwtAdapter = new JWTAdapter(env.JWT_SECRET);
  const addSpace = new DbAddFeedback(reservationRepository, feedbackPrismaRepository, jwtAdapter);

  const validator = new AddFeedbackValidatorAdapter();

  return new AddFeedbackController(
    addSpace,
    validator
  );
};
