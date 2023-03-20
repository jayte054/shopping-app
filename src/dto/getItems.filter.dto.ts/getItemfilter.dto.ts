

import {IsIn, IsNotEmpty, IsOptional} from "class-validator"
import { ShoppingStatus } from "src/shoppingModule/ShoppingStatusEnum/shopping.status.enum"

export class GetItemsFilterDto {
    @IsOptional()
    @IsIn([ShoppingStatus.PAID, ShoppingStatus.NOT_PAID])
    status: ShoppingStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}