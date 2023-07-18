import { Injectable } from "@nestjs/common";
import crypto from "crypto"
import  * as nodemailer from "nodemailer"

@Injectable()
export class Passwordhandler {
    private readonly resetTokenExpiration = 3600;
    // private transporter : nodemailer.Transporter;

   



  
}