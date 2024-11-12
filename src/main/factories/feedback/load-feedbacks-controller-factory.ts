import { DbLoadFeedbacks } from '@data/usecases/feedback/db-load-feedbacks';
import { FeedbackPrismaRepository } from '@infra/db/feedback/feedback-prisma-repository';
import { LoadFeedbacksController } from '@presentation/controllers/feedback/load-feedbacks-controller';
import { Controller } from '@presentation/protocols/controller';

export const makeLoadFeedbacksController = (): Controller => {
  const feedbackPrismaRepository = new FeedbackPrismaRepository();
  const loadFeedbacks = new DbLoadFeedbacks(feedbackPrismaRepository);

  return new LoadFeedbacksController(
    loadFeedbacks,
  );
};
