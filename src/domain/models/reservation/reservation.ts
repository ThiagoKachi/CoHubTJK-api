import { FeedbackModel } from '../feedback/feedback';

export interface ReservationModel {
  id: string;
  date: Date;
  created_at: Date;
  deleted_at?: Date | null;
  finished_at?: Date | null;
  accountId: string;
  spaceId: string;
  feedback?: FeedbackModel[] | null;
}
