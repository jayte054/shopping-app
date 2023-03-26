import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../authRepository/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { JwtPayload } from '../jwt-interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    // ======= sign up ========
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userRepository.signUp(authCredentialsDto)
    }

    // ========= sign in ============
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)

        if (!username) {
            throw new UnauthorizedException("invalid credentials")
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload)

        return {accessToken}
    }
   
}
