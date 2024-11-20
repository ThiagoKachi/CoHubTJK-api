export interface FeedbackModel {
  id: string;
  rating: number;
  feedback?: string | null;
  created_at: string;
  reservationId: string;
  spaceId: string;
  guestId: string;
}
