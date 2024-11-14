import { DbAddFeedback } from '@data/usecases/feedback/db-add-feedback';
import { AccountPrismaRepository } from '@infra/db/account/account-prisma-repository';
import { FeedbackPrismaRepository } from '@infra/db/feedback/feedback-prisma-repository';
import { ReservationPrismaRepository } from '@infra/db/reservation/reservation-prisma-repository';
import { SpacePrismaRepository } from '@infra/db/space/space-prisma-repository';
import { AddFeedbackValidatorAdapter } from '@infra/validation/feedback/create-feedback-validation-adapter';
import { AddFeedbackController } from '@presentation/controllers/feedback/add-feedback-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeFeedbackController = (): Controller => {
  const accountRepository = new AccountPrismaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const reservationRepository = new ReservationPrismaRepository();
  const feedbackPrismaRepository = new FeedbackPrismaRepository();
  const addSpace = new DbAddFeedback(accountRepository, spaceRepository, reservationRepository, feedbackPrismaRepository);

  const validator = new AddFeedbackValidatorAdapter();

  return new AddFeedbackController(
    addSpace,
    validator
  );
};
