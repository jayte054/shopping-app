import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as sgMail from "@sendgrid/mail";
import { Logger } from "@nestjs/common";

@Injectable()
export class MailerService {
    private logger = new Logger("mailerService")
    constructor() {
        sgMail.setApiKey("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");
      }

    async sendWelcomeMail( username: string): Promise<void>{
        const msg: sgMail.MailDataRequired = {
            from: "shoppingmanager317@gmail.com",
            to: username,
            subject: " Shopping manager ",
            text: `Dear ${username}, \n\nWelcome to shopping manager, we hope you enjoy the experience`
        };

        try{
            this.logger.verbose(`user ${username} welcome mail sent successfully`)
            await sgMail.send(msg);

        }catch(error){
            console.log(error)
            this.logger.error(`user ${username} invalid email address`)
            console.log(new InternalServerErrorException())
            throw new InternalServerErrorException()
        }
    }
}