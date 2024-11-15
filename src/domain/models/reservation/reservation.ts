import { FeedbackModel } from '../feedback/feedback';
import { SpaceModel } from '../space/space';
import { GuestReservationModel } from './guest';

export interface ReservationModel {
  id: string;
  date: Date;
  created_at: Date;
  deleted_at?: Date | null;
  finished_at?: Date | null;
  accountId: string;
  spaceId: string;
  feedback?: FeedbackModel[] | null;
  space?: SpaceModel | null;
  guests?: GuestReservationModel[] | null;
}
