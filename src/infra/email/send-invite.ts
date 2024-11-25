import { EmailSender } from '@data/protocols/email/email-sender';
import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';
import mail from '@main/config/mail';
import { AppError } from '@presentation/errors/AppError';
import path from 'node:path';
import { Resend } from 'resend';
import { HandlebarsMailTemplate } from './templates/handlebars-mail-template';

const resend = new Resend(mail.config.secret);

const sendInviteTemplate = path.resolve(__dirname, '.', 'views', 'send-invite.hbs');

export class SendInviteEmailService implements EmailSender {
  public async send(guest: GuestModel, reservation: ReservationModel, token: string): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const invite = {
      file: sendInviteTemplate,
      variables: {
        name: guest.name,
        date: new Date(reservation.date).toLocaleDateString('pt-BR'),
        space: reservation.space?.name ?? 'CoHubTJK',
        url: `https://cohubtjk.thikachi.dev.br/reservation-invite/${token}`
      }
    };

    const { error } = await resend.emails.send({
      from: 'CoHubTJK <cohubtjk@thikachi.dev.br>',
      to: guest.email,
      subject: `CoHubTJK - Convite para ${guest.name}`,
      html: await mailTemplate.parse(invite),
    });

    if (error) {
      throw new AppError(error.message);
    }
  }
}
