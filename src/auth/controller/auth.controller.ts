import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto/resetPassword.dto';

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

    @ApiOperation({summary: "send email while passing the token as a parameter to the user"})
    @ApiResponse({status: 201, description: "reset password link sent to user"})
    @Post("/resetEmail")
    async sendEmail(@Body() resetPasswordDto: ResetPasswordDto): Promise<void>{
        return await this.authservice.sendPasswordResetEmail(resetPasswordDto)
    }
}
