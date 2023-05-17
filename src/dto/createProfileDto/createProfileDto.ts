import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    address: string;
}