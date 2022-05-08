import { MailAdapter, SendMailData } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4595b0c0f8a20c",
    pass: "d7586e944208a7"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail (data: SendMailData) {
    const { subject, body} = data
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com',
      to: 'Enan dorta <junior.goncalves01@hotmail.com>',
      subject: subject,
      html: body,
    })
  };
}