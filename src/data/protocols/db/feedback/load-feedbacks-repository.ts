import { FeedbackModel } from '@domain/models/feedback/feedback';
import { LoadFeedbackModel } from '@domain/models/feedback/load-feedback';

export interface LoadFeedbacksRepository {
  load ({ reservationId }: LoadFeedbackModel): Promise<FeedbackModel[] | null>
}
