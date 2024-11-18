import { AccountModel } from '@domain/models/account/account';
import { AddReservationModel } from '@domain/models/reservation/add-reservation';
import { ReservationModel } from '@domain/models/reservation/reservation';

export interface AddReservationRepository {
  add (reservationData: AddReservationModel, account: AccountModel): Promise<ReservationModel>
}
