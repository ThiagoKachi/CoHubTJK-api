export interface AddFeedbackModel {
  rating: number;
  feedback?: string | null;
  reservationId: string;
  accountId: string;
  spaceId: string;
}
