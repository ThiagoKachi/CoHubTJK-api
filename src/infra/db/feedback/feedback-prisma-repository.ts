import { AddFeedbackRepository } from '@data/protocols/db/feedback/add-feedback-repository';
import { LoadFeedbacksRepository } from '@data/protocols/db/feedback/load-feedbacks-repository';
import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { FeedbackModel } from '@domain/models/feedback/feedback';
import { LoadFeedbackModel } from '@domain/models/feedback/load-feedback';
import { prismaClient } from '../prismaClient';

export class FeedbackPrismaRepository implements AddFeedbackRepository, LoadFeedbacksRepository {
  async load({ reservationId }: LoadFeedbackModel): Promise<FeedbackModel[] | null> {
    const feedbacks = await prismaClient.feedback.findMany({ where: { reservationId } });

    return feedbacks && feedbacks;
  }

  async add(feedbackData: AddFeedbackModel): Promise<FeedbackModel> {
    const feedback = await prismaClient.feedback.create({ data: feedbackData });

    return { ...feedback };
  }
}
