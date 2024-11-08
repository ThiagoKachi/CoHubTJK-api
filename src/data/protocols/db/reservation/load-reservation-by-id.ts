import { ReservationModel } from '@domain/models/reservation/reservation';

export interface LoadReservationByIdRepository {
  loadById (id: string): Promise<ReservationModel | null>
}
