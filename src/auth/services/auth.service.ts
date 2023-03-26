import { Injectable } from '@nestjs/common';
import { UserRepository } from '../authRepository/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    // ======= sign up ========
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userRepository.signUp(authCredentialsDto)
    }
}
