import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { ReservationInviteModel } from '@domain/models/reservation/reservation-invite';
import { SendReservationInviteModel } from '@domain/models/reservation/send-reservation-invite';
import { SendReservationInvite } from '@domain/usecases/reservation/send-reservation-invite';

// A conta existe ✅
// A reserva existe ✅
// Quem vai mandar os convites, é o dono da reserva? ✅
// Se sim:
// - confere se o número de convites é menor igual a capacidade (Contando com o dono da reserva)
// - adiciona os convidados a tabela de "guests" da reserva
// - envia os convites por email
// Se não: retorna null ✅
export class DbSendReservationInvite implements SendReservationInvite {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
  ) {}

  async send(reservationInvite: SendReservationInviteModel): Promise<ReservationInviteModel[] | null> {
    const account = await this.loadAccountByIdRepository.loadById(reservationInvite.accountId);

    if (account) {
      const reservation = await this.loadReservationByIdRepository.loadById(reservationInvite.reservationId);

      if (reservation) {
        if (reservation.accountId === reservationInvite.accountId) {
          // TODO: Incluir os dados do space dentro do retorno da reserva
          return null;
        }
      }
    }

    return null;
  }
}
