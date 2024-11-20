import { AddFeedbackRequestModel } from '@domain/models/feedback/add-feedback';

export interface AddFeedback {
  add (feedback: AddFeedbackRequestModel): Promise<void | null>
}
