import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { Logger } from "@nestjs/common";
import { config } from "dotenv";

config();

@Injectable()
export class MailerService {
  private logger = new Logger("mailerService");
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ashoppingmanager@gmail.com",
        pass: "nyxuquekzghepsfo",
      },
    });
  }

  async sendWelcomeMail(username: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: username,
      subject: "Shopping Manager",
      text: `Dear ${username},\n\nWelcome to Shopping Manager! We hope you enjoy the experience.`,
    };

    try {
      this.logger.verbose(`User ${username} welcome mail sent successfully`);
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error(`User ${username} invalid email address`);
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
