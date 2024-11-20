export interface AddFeedbackModel {
  rating: number;
  feedback?: string | null;
  reservationId: string;
  guestId: string;
  spaceId: string;
}

export interface AddFeedbackRequestModel {
  rating: number;
  feedback?: string | null;
  token: string;
}
