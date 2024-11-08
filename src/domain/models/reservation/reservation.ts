export interface ReservationModel {
  id: string;
  date: Date;
  created_at: Date;
  deleted_at?: Date | null;
  accountId: string;
  spaceId: string;
}
