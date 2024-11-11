import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { FeedbackModel } from '@domain/models/feedback/feedback';

export interface AddFeedback {
  add (feedback: AddFeedbackModel): Promise<FeedbackModel | null>
}
