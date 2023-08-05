import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { Logger } from "@nestjs/common";
import {config} from "dotenv";
import crypto from "crypto"
import { Gmail_Password, Gmail_User } from "src/config";
import { DirectoryMailDto } from "src/dto/directorymail/directorymail.dto";



@Injectable()
export class MailerService {
  private logger = new Logger("mailerService");
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: Gmail_User ,
        pass: Gmail_Password,
      },
    });
  }

  async sendWelcomeMail(username: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: username,
      subject: "Shopping Manager",
      html: `
      <h1> Welcome Mail </h1>
      <p>Dear ${username},\n\nWelcome to Shopping Manager! We hope you enjoy the experience.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.verbose(`User ${username} welcome mail sent successfully`);
    } catch (error) {
      this.logger.error(`User ${username} invalid email address`);
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async registerOnDirectory(directoryMailDto: DirectoryMailDto): Promise<void> {
    const {username} = directoryMailDto
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: "shoppingmanager317@gmail.com", 
      subject: "Register On Shopping Mansger Directory",
      html: `
         <h1>Resgisteration Request</h1

         <p>I <a>${username}</a> would like to register my business on your Directory page</p> 
        `,
    }

    try{
      await this.transporter.sendMail(mailOptions);
      this.logger.verbose(`user ${username} directory registeration mail sent successfully`)
    }catch(error){
      this.logger.error(`User ${username} has and invalid email address`);
      throw new InternalServerErrorException()
    }
  }


}
