import { EmailSender } from '@data/protocols/email/email-sender';
import { GuestModel } from '@domain/models/reservation/guest';
import { ReservationModel } from '@domain/models/reservation/reservation';
import mail from '@main/config/mail';
import { AppError } from '@presentation/errors/AppError';
import path from 'node:path';
import { Resend } from 'resend';
import { HandlebarsMailTemplate } from './templates/handlebars-mail-template';

const resend = new Resend(mail.config.secret);

const sendFeedbackRequestTemplate = path.resolve(__dirname, '.', 'views', 'send-feedback-request.hbs');

export class SendInviteEmailService implements EmailSender {
  public async send(guest: GuestModel, reservation: ReservationModel, token: string): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const invite = {
      file: sendFeedbackRequestTemplate,
      variables: {
        name: guest.name,
        date: new Date(reservation.date).toLocaleDateString('pt-BR'),
        space: reservation.space?.name ?? 'CoHubTJK',
        feedbackUrl: `https://cohubtjk.thikachi.dev.br/feedback/${token}`
      }
    };

    const { error } = await resend.emails.send({
      from: 'CoHubTJK <cohubtjk@thikachi.dev.br>',
      to: guest.email,
      subject: `CoHubTJK - Envie seu feedback ${guest.name}`,
      html: await mailTemplate.parse(invite),
    });

    if (error) {
      throw new AppError(error.message);
    }
  }
}
