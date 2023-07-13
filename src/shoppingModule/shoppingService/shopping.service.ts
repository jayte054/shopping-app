

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { ShoppingEntity } from "../entity/shopping.entity";
import { ShoppingRepository } from "../shoppingRepository/shopping.repository";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingRepository)
        private shoppingRepository: ShoppingRepository
    ) {}

    async getitems(
        filterDto: GetItemsFilterDto,
        user: UserEntity
        ): Promise<ShoppingEntity[]> {
        // const {status, search} = filterDto
        // const query = this.shoppingRepository.createQueryBuilder("item")
       
        // if(status) {
        //     query.andWhere("item.status = :status", {status})
        // }

        // if(search) {
        //     query.andWhere("item.item LIKE :search OR item.price LIKE :search", {search: `%${search}%`})
        // }
        
        // const item = await query.getMany()
        // return item

        return this.shoppingRepository.getitems(filterDto, user)
    }

    async createList(
        createListDto: CreateListDto,
        user: UserEntity
        ): Promise<ShoppingEntity> {   

        return await this.shoppingRepository.createList(createListDto, user)
    }

    async getItemWithId(
        id: string,
        user: UserEntity
        ): Promise<ShoppingEntity> {
        // const itemID = await this.shoppingRepository.findOne({
        //     where: {
        //         id,
        //     }
        // })

        // if(!itemID) {
        //     throw new NotFoundException(`Item with id ${id} not found`)
        // }

        // return itemID

        return this.shoppingRepository.getItemWithId(id, user)
    }

    async updateItem(
        id:string, 
        status:ShoppingStatus,
        user: UserEntity, 
        item?: string, 
        price?:string ): Promise<ShoppingEntity> {
        // const singleItem = await this.getItemWithId(id)
        // singleItem.item = item
        // singleItem.price = price
        // singleItem.status = status

        // await singleItem.save()
        // return singleItem

        return this.shoppingRepository.updateItem(id, status, user, item, price )
    }

     deleteItem = async(
        id: string,
        user: UserEntity
        ): Promise<string> => {
        // const result = await this.shoppingRepository.delete(id)
        
        // if(!result) {
        //     throw new NotFoundException()
        // }

        // return id

        return this.shoppingRepository.deleteItem(id, user)
    }

}