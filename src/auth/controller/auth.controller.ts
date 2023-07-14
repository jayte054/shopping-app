import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService
    ){}

    @ApiOperation({summary: "User sign-up"})
    @ApiResponse({status: 201, description: "user created successfully"})
    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authservice.signUp(authCredentialsDto)
    }

    @ApiOperation({summary: "User signin"})
    @ApiResponse({status:201, description: `accesstoken, userdetails`})
    @Post("/signin")
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authservice.signIn(authCredentialsDto)
    }
}
