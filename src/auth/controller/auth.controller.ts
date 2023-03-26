import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService
    ){}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authservice.signUp(authCredentialsDto)
    }
}
