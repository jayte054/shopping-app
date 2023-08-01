import * as crypto from "crypto"
import * as nodemailer from "nodemailer";
import {  Injectable, Logger } from "@nestjs/common";
import { MailerService } from "src/mailer/mailer.service";
import { UserEntity } from "../userEntity/user.entity";
import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common/exceptions";
import {Repository, DataSource,  } from "typeorm"
import { AuthCredentialsDto } from "../dto/authCredentials.dto";
import * as bcrypt from "bcrypt"
import {v4 as uuidV4} from "uuid"
import { Gmail_Password, Gmail_User } from "src/config";
import { PasswordResetTokenEntity } from "src/passwordResetTokenModule/reset-token.entity/passwordResetToken.enitity";
import { ResetPasswordDto } from "src/dto/resetPassword.dto/resetPassword.dto";
import { PasswordResetDto } from "src/dto/passwordResetDto/passwordReset.Dto";
import { DirectoryMailDto } from "src/dto/directorymail/directorymail.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    private logger = new Logger("AuthService")
    constructor(
        private dataSource: DataSource,
        private readonly mailerService: MailerService,
    ){
        super(UserEntity, dataSource.createEntityManager())
    }
    

    //==========user signup =============

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto

        const user = new UserEntity()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashedPassword(password, user.salt)

        try{
            
        await this.mailerService.sendWelcomeMail( user.username)
        await user.save()
        }catch(error){
            if(error.code === "23505") {
                throw new ConflictException("username already exists")
            } else {
                // throw new InternalServerErrorException()
                return "error creating new user"
            }
        }
        return `user ${JSON.stringify(user.username)}  created successfully`
    }

    private async hashedPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

   

    //======= user sign in===============
    

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
      
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder
          .select(['user.id', 'user.username', 'user.password', 'user.salt', 'user.isAdmin'])
          .where('user.username = :username', { username });
      
        const user = await queryBuilder.getOne();
      
        if (user && (await user.validatePassword(password))) {
          return {id:user.id, username:user.username, isAdmin: user.isAdmin};
        } else {
          return null;
        }
      }

      //======== reset password ==========

      async sendPasswordResetEmail(resetPasswordDto: ResetPasswordDto): Promise<PasswordResetTokenEntity | any> {
        const {username} = resetPasswordDto
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: Gmail_User ,
                pass: Gmail_Password,
            },
        }) 

        const generateResetToken = (): any => {
            const token = crypto.randomBytes(20).toString("hex");
            const expiresInMinutes = 10; 
            let expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
            return token
        }
        
        const generateResetLink =(resetToken: string): string => {
            const resetLink = `localhost:3002/reset-password?token=${resetToken}`
            return resetLink
        }
        const resetToken = generateResetToken()
        const resetLink = generateResetLink(resetToken)
    
        const mailOptions : nodemailer.SendMailOptions = {
          from: process.env.EMAIL_USER,
          to: username,
          subject: "Password Reset",
          html:`
          <h1>Password Reset Email</h1>
          <p> Dear customer you have requested a password rest,</p>
          
          <p>please not that the link expires in 10mins</p>
              <p>please copy and paste the token in the token input; </p>
                <p> ${resetToken}
          `
        };

        const getTimestampPlusMinutes = (minutes: number) => {
            const date = new Date()
            date.setMinutes(date.getMinutes() + minutes)
            return date
        }

        const user = await UserEntity.findOne({where:{username}})

        const passwordResetToken = new PasswordResetTokenEntity()
        passwordResetToken.id = uuidV4()
        // console.log(passwordResetToken.id)
        passwordResetToken.resetToken = resetToken
        passwordResetToken.expiresAt = getTimestampPlusMinutes(20)
        passwordResetToken.user = user
        // console.log(user)
        passwordResetToken.username = username
         try{
          await passwordResetToken.save()
          console.log(passwordResetToken)
          console.log("here")
          await transporter.sendMail(mailOptions)
            
         }catch(error){
            console.log(error)
          throw new Error("failed to send password reset")
         }

     return {
            id: passwordResetToken.id,
            resetToken: passwordResetToken.resetToken, 
            username: passwordResetToken.username,
            expiresAt: passwordResetToken.expiresAt,
            message:"reset token sent successfully"
            } 
     
}

async resetPassword(passwordResetDto: PasswordResetDto): Promise<string | any> {
    const {token, newPassword} = passwordResetDto
    try{
        const resetToken = await PasswordResetTokenEntity.findOne({where: {resetToken: token}})
        console.log("ihere")
        console.log(resetToken)
        if(!resetToken){
            throw new NotFoundException("Invalid or expired token")
        }
    
        const user = await UserEntity.findOne({where:{ id: resetToken.userId}})
        console.log(user.password)
        console.log(user.salt)
        const isTokenExpired = resetToken.expiresAt > new Date()
    
        if(!isTokenExpired) {
            throw new UnauthorizedException("token has expired")
        }
    
         user.salt  = await bcrypt.genSalt(10);
        console.log(user.salt)
        console.log(newPassword)
        const hash = await bcrypt.hash(newPassword, user.salt);
        user.password = hash
        user.save()
        resetToken.remove()

        this.logger.verbose("password reset successful")
        return "password reset successful"
    }catch(error){
        console.log(error)
        // throw error
        return "password reset unsuccessful"
    }
   
} 

async directoryRegister(directoryMailDto: DirectoryMailDto): Promise<string> {
        const {username} = directoryMailDto
    try{
        await this.mailerService.registerOnDirectory(directoryMailDto)
        return `${username} directory registeration email sent successfully`
    }catch(error){
        throw new Error("registeration email unsuccessful")
    }
}

}