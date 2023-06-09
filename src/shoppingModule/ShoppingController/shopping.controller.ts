import { Logger, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/getUser.Decorator/get-user.decorator";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { ShoppingStatusValidationPipe } from "src/pipes/shopping-status-validation.pipe";
import { ShoppingEntity } from "../entity/shopping.entity";
import { ShoppingService } from "../shoppingService/shopping.service";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Controller("shopper")
@UseGuards(AuthGuard())
export class ShoppingController {
    private logger = new Logger("ShoppingController")
    constructor(private shoppingService: ShoppingService) {}

    @Get("/items")
    getItems(@Query(ValidationPipe) filterDto: GetItemsFilterDto,
    @GetUser() user: UserEntity
    ): Promise<ShoppingEntity[]>{
        this.logger.verbose(`User "${user.username}" retrieved all items`)
        return this.shoppingService.getitems(filterDto, user)
    }

    @Post("/createlist")
    @UsePipes(ValidationPipe)
    createList(@Body() createListDto: CreateListDto,
    @GetUser() user: UserEntity
    ): Promise<ShoppingEntity> {
        
        this.logger.verbose(`User  just created a new list. Data: ${createListDto}`)
        console.log(createListDto, user)
        console.log(this.shoppingService.createList(createListDto, user))
        return this.shoppingService.createList(createListDto, user)
    }

    @Get("/:id")
    getItemWithId(@Param("id")id: string,
    @GetUser() user: UserEntity
    ): Promise<ShoppingEntity> {
        this.logger.verbose(`user "${user.username}" retrieved shopping list with id: ${id}`)
        return this.shoppingService.getItemWithId(id, user)
    }

    @Patch("/:id/status")
    updateItem(
        @Param("id") id: string,
        @Body("item") item: string,
        @Body("price") price: string,
        @Body("status", ShoppingStatusValidationPipe) status: ShoppingStatus,
        @GetUser() user: UserEntity 
    ): Promise<ShoppingEntity> {
        this.logger.verbose(`User "${user.username}" just updated list with id "${id}. Status: ${status}. item: ${item}. price: ${price}`)
        return this.shoppingService.updateItem(id, status, user, item, price, )
    }

    @Delete("/:id")
    deleteItem(
        @Param("id") id: string,
        @GetUser() user: UserEntity
        ): Promise<string> {
            this.logger.verbose(`User "${user.username}" just deleted a list with id: "${id}"`)
        return this.shoppingService.deleteItem(id, user)
    }
}
