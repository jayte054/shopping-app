import { IsNotEmpty } from "class-validator";


export class CreateListDto {
    @IsNotEmpty()
    item: string;

    @IsNotEmpty()
    price: string
}