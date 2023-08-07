import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";


export class CreateDirectoryEntryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    walletId: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    // @Min(-90)
    // @Max(90)
    // @IsNumber() 
    latitude: string;
    
    @IsNotEmpty()
    // @Min(-180)
    // @Max(180)
    // @IsNumber() 
    longitude: string;
}