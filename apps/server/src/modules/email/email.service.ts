import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { metaData } from 'src/config/metaData';
import {
  createLinkMailTemplate,
  createLinkResultMailTemplate,
  createCommentMailTemplate,
  createReplyCommentMailTemplate,
  createBlogCommentMailTemplate,
  createReplyBlogCommentMailTemplate,
  createUserRegisterMailTemplate,
} from './templates';

export interface SendEmailOptions {
  to: string;
  subject: string;
  name?: string;
  text?: string;
  html?: string;
}
@Injectable()
export class EmailService {
  transporter?: ReturnType<typeof nodemailer.createTransport>;
  createLinkMailTemplate = createLinkMailTemplate;
  createLinkResultMailTemplate = createLinkResultMailTemplate;
  createCommentMailTemplate = createCommentMailTemplate;
  createReplyCommentMailTemplate = createReplyCommentMailTemplate;
  createBlogCommentMailTemplate = createBlogCommentMailTemplate;
  createReplyBlogCommentMailTemplate = createReplyBlogCommentMailTemplate;
  createUserRegisterMailTemplate = createUserRegisterMailTemplate;
  constructor() {}

  update() {
    const email = metaData.config.email;
    if (email) {
      this.transporter = nodemailer.createTransport({
        host: email.smtpHost,
        port: email.smtpPort,
        secure: true,
        auth: {
          user: email.senderEmail,
          pass: email.senderPassword,
        },
      });
    }
  }

  async send(options: SendEmailOptions) {
    console.log('sending email...');
    const info = (await this.transporter?.sendMail({
      from: `"${options.name || metaData.config.meta?.title}" <${metaData.config.email?.senderEmail}>`,
      to: options.to,
      subject: `${options.subject}👻`,
      text: options.text,
      html: options.html,
    })) as Record<string, any>;
    console.log(info);
    console.log('Message sent: %s', info.messageId);
  }

  async test() {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      // Message object
      const message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        html: this.createUserRegisterMailTemplate({
          title: '有新用户注册了👻',
          user: {
            username: 'admin',
            email: '1231@13.com',
            url: 'https://baidu.com',
          },
        }),
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
    return 'haha';
  }
}
