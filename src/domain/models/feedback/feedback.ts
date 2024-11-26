export interface FeedbackModel {
  id: string;
  rating: number;
  feedback?: string | null;
  created_at: Date;
  reservationId: string;
  spaceId: string;
  guestId: string;
}
