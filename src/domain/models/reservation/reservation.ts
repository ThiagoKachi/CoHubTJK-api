export interface ReservationModel {
  id: string;
  date: Date;
  created_at: Date;
  deleted_at?: Date;
  accountId: string;
  spaceId: string;
}
