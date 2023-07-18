import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    username:string;
}