

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { ShoppingEntity } from "../entity/shopping.entity";
import { ShoppingRepository } from "../shoppingRepository/shopping.repository";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingEntity)
        private shoppingRepository: ShoppingRepository
    ) {}

    async getitems(filterDto: GetItemsFilterDto): Promise<ShoppingEntity[]> {
        const {status, search} = filterDto
        const query = this.shoppingRepository.createQueryBuilder("item")
       
        if(status) {
            query.andWhere("item.status = :status", {status})
        }

        if(search) {
            query.andWhere("item.item LIKE :search OR item.price LIKE :search", {search: `%${search}%`})
        }
        
        const item = await query.getMany()
        return item
    }

    async createList(createListDto: CreateListDto): Promise<ShoppingEntity> {
        const {item, price} = createListDto

        const list = new ShoppingEntity()
        list.item = item;
        list.price = price;
        list.status = ShoppingStatus.NOT_PAID
        await list.save()

        return list    
    }

    async getItemWithId(id: string): Promise<ShoppingEntity> {
        const itemID = await this.shoppingRepository.findOne({
            where: {
                id,
            }
        })

        if(!itemID) {
            throw new NotFoundException(`Item with id ${id} not found`)
        }

        return itemID
    }

    async updateItem(id:string, status:ShoppingStatus, item?: string, price?:string ): Promise<ShoppingEntity> {
        const singleItem = await this.getItemWithId(id)
        singleItem.item = item
        singleItem.price = price
        singleItem.status = status

        await singleItem.save()
        return singleItem
    }

     deleteItem = async(id: string): Promise<string> => {
        const result = await this.shoppingRepository.delete(id)
        
        if(!result) {
            throw new NotFoundException()
        }

        return id
    }

}