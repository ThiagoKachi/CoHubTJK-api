import { CancelReservationEmailSender } from '@data/protocols/email/cancel-reservation';
import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';
import mail from '@main/config/mail';
import { AppError } from '@presentation/errors/AppError';
import path from 'node:path';
import { Resend } from 'resend';
import { HandlebarsMailTemplate } from './templates/handlebars-mail-template';

const resend = new Resend(mail.config.secret);

const sendFeedbackRequestTemplate = path.resolve(__dirname, '.', 'views', 'cancel-reservation.hbs');

export class CancelReservationEmailService implements CancelReservationEmailSender {
  public async send(reservation: ReservationModel, guest: GuestModel): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const invite = {
      file: sendFeedbackRequestTemplate,
      variables: {
        name: guest.name,
        date: new Date(reservation.date).toLocaleDateString('pt-BR'),
        space: reservation.space?.name ?? 'CoHubTJK',
      }
    };

    const { error } = await resend.emails.send({
      from: 'CoHubTJK <cohubtjk@thikachi.dev.br>',
      to: guest.email,
      subject: 'CoHubTJK - Reserva cancelada',
      html: await mailTemplate.parse(invite),
    });

    if (error) {
      throw new AppError(error.message);
    }
  }
}
