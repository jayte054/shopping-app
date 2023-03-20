import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShoppingEntity } from "./entity/shopping.entity";
import { ShoppingController } from "./ShoppingController/shopping.controller";
import { ShoppingRepository } from "./shoppingRepository/shopping.repository";
import { ShoppingService } from "./shoppingService/shopping.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ShoppingEntity, ShoppingRepository])
    ],
    controllers: [ShoppingController],
    providers: [ShoppingService, ShoppingRepository]
})

export class ShoppingModule {}