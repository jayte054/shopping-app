import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../authRepository/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from "src/mailer/mailer.service";
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { JwtPayload } from '../jwt-interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt/dist';
import { UserEntity } from '../userEntity/user.entity';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto/resetPassword.dto';
import { PasswordResetDto } from 'src/dto/passwordResetDto/passwordReset.Dto';

@Injectable()
export class AuthService {
    private logger = new Logger("AuthService")
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService

    ){}

    // ======= sign up ========
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        this.logger.debug(`New user created`)
        return this.userRepository.signUp(authCredentialsDto)
    }

    // ========= sign in ============
    async signIn(authCredentialsDto: AuthCredentialsDto):  Promise<{accessToken: any}> {
        const userdetails = await this.userRepository.validateUserPassword(authCredentialsDto)
        console.log(userdetails)
         const {username, id, isAdmin} = userdetails
        // console.log(username)
        // const id = userdetails.id
        // console.log(userdetails)
        

        if (!userdetails) {
            throw new UnauthorizedException("invalid credentials")
        }

        const payload: JwtPayload = { username, id };
        console.log(payload)
        const accessToken = await this.jwtService.sign(payload)
        console.log(accessToken)
        this.logger.debug(`Generated JWT Token with payload: ${JSON.stringify(payload)}`)
        const response = {
            "accessToken": accessToken,
            "user": userdetails
        }
        return response 
    }

    async sendPasswordResetEmail(resetPasswordDto: ResetPasswordDto): Promise<void>{
        this.logger.verbose("reset link sent successfully")
       return  await this.userRepository.sendPasswordResetEmail(resetPasswordDto)
    }

    async resetPassword(passwordResetDto: PasswordResetDto) : Promise<string> {
        return await this.userRepository.resetPassword(passwordResetDto)
    }
   
}
