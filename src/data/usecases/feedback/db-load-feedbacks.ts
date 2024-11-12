import { LoadFeedbacksRepository } from '@data/protocols/db/feedback/load-feedbacks-repository';
import { FeedbackModel } from '@domain/models/feedback/feedback';
import { LoadFeedbackModel } from '@domain/models/feedback/load-feedback';
import { LoadFeedbacks } from '@domain/usecases/feedback/load-feedbacks';

export class DbLoadFeedbacks implements LoadFeedbacks {
  constructor(private readonly loadFeedbacksRepository: LoadFeedbacksRepository) {}

  async load({ reservationId }: LoadFeedbackModel): Promise<FeedbackModel[] | null> {
    const feedbacks = await this.loadFeedbacksRepository.load({ reservationId });

    return feedbacks;
  }
}
