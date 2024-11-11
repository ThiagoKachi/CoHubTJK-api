import { AddFeedbackRepository } from '@data/protocols/db/feedback/add-feedback-repository';
import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { FeedbackModel } from '@domain/models/feedback/feedback';
import { prismaClient } from '../prismaClient';

export class FeedbackPrismaRepository implements AddFeedbackRepository {
  async add(feedbackData: AddFeedbackModel): Promise<FeedbackModel> {
    const feedback = await prismaClient.feedback.create({ data: feedbackData });

    return { ...feedback, created_at: new Date(feedback.created_at).toISOString() };
  }
}
