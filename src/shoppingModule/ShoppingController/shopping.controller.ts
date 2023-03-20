import { ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from "@nestjs/common/decorators";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { ShoppingStatusValidationPipe } from "src/pipes/shopping-status-validation.pipe";
import { ShoppingEntity } from "../entity/shopping.entity";
import { ShoppingService } from "../shoppingService/shopping.service";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Controller("shopper")
export class ShoppingController {
    constructor(private shoppingService: ShoppingService) {}

    @Get("/items")
    getItems(@Query(ValidationPipe) filterDto: GetItemsFilterDto): Promise<ShoppingEntity[]>{
        return this.shoppingService.getitems(filterDto)
    }

    @Post("/create-list")
    @UsePipes(ValidationPipe)
    createList(@Body() createListDto: CreateListDto): Promise<ShoppingEntity> {
        return this.shoppingService.createList(createListDto)
    }

    @Get("/:id")
    getItemWithId(@Param("id")id: string): Promise<ShoppingEntity> {
        return this.shoppingService.getItemWithId(id)
    }

    @Patch("/:id/status")
    updateItem(
        @Param("id") id: string,
        @Body("item") item: string,
        @Body("price") price: string,
        @Body("status", ShoppingStatusValidationPipe) status: ShoppingStatus 
    ): Promise<ShoppingEntity> {
        return this.shoppingService.updateItem(id, status, item, price)
    }

    @Delete("/:id")
    deleteItem(@Param("id") id: string): Promise<string> {
        return this.shoppingService.deleteItem(id)
    }
}
