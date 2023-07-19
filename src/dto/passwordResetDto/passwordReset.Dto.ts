import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class PasswordResetDto {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
               {message: "password is too weak"}) 
    newPassword: string;
}