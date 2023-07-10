import { IsNotEmpty } from "class-validator";


export class CreateDirectoryEntryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    walletId: string;
}