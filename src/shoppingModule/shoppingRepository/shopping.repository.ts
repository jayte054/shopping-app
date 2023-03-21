import { Injectable } from "@nestjs/common/decorators";
import { ShoppingEntity } from "../entity/shopping.entity";
import { Repository, DataSource } from "typeorm"
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class ShoppingRepository extends Repository<ShoppingEntity> {
    constructor(private dataSource: DataSource) {
        super(ShoppingEntity, dataSource.createEntityManager())
    }

        async getitems(filterDto: GetItemsFilterDto): Promise<ShoppingEntity[]> {
            const {status, search} = filterDto
            const query = this.createQueryBuilder("item")
           
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
            const itemID = await this.findOne({
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
            const result = await this.delete(id)
            
            if(!result) {
                throw new NotFoundException()
            }
    
            return id
        }
}