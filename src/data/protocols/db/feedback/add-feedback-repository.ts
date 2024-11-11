import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { FeedbackModel } from '@domain/models/feedback/feedback';

export interface AddFeedbackRepository {
  add (feedbackData: AddFeedbackModel): Promise<FeedbackModel>
}
