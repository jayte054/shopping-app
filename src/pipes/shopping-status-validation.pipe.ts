import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ShoppingStatus } from "src/shoppingModule/ShoppingStatusEnum/shopping.status.enum";



export class ShoppingStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        ShoppingStatus.PAID,
        ShoppingStatus.NOT_PAID
    ]

    transform(value: any) {
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not a valid status`)
        }
        return value
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status)
        return index !== -1
    }
}