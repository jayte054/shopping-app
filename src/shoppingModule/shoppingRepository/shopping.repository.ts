import { Injectable } from "@nestjs/common/decorators";
import { ShoppingEntity } from "../entity/shopping.entity";
import { Repository, DataSource } from "typeorm"
import { GetItemsFilterDto } from "src/dto/getItems.filter.dto.ts/getItemfilter.dto";
import { CreateListDto } from "src/dto/createListDto/createList.dto";
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";
import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UserEntityData } from "src/auth/userEntity/userEntityData";
import { UserEntity } from "src/auth/userEntity/user.entity";

@Injectable()
export class ShoppingRepository extends Repository<ShoppingEntity> {
    private logger = new Logger("shoppingRepository")
    constructor(private dataSource: DataSource) {
        super(ShoppingEntity, dataSource.createEntityManager())
    }

        async getitems(
            filterDto: GetItemsFilterDto,
            user: UserEntity
            ): Promise<ShoppingEntity[]> {
            const {status, search} = filterDto
            const query = this.createQueryBuilder("item")

            query.where("item.userId = :userId", {userId: user.id})
           
            if(status) {
                query.andWhere("item.status = :status", {status})
            }
    
            if(search) {
                query.andWhere("item.item LIKE :search OR item.price LIKE :search", {search: `%${search}%`})
            }
            
            try{
            const item = await query.getMany()
            return item
            }catch(error){
                this.logger.error(`User "${user.username}" failed to retrieve all shopping lists. Data ${filterDto}`)
                throw new InternalServerErrorException()
            }
        }

        async createList(
            createListDto: CreateListDto,
            user: UserEntity
            ): Promise<ShoppingEntity> {
            const {item, price} = createListDto
            // const {id, username} = userData
            const list = new ShoppingEntity()
            list.item = item;
            list.price = price;
            list.date = new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });;
            list.user = user
            list.status = ShoppingStatus.NOT_PAID

            try{
            await list.save()
            }catch(error){
                console.error(error)
                this.logger.error(`user "${user}" failed to create list. Data: ${createListDto}`)
                throw new InternalServerErrorException()
            }

            delete list.user
    
            return list    
        }

        async getItemWithId(
            id: string,
            user: UserEntity
            ): Promise<ShoppingEntity> {
            const itemID = await this.findOne({
                where: {
                    id,
                    userId: user.id
                }
            })
    
            if(!itemID) {
                throw new NotFoundException(`Item with id ${id} not found`)
            }

            try{
            return itemID
            }catch(error){
                this.logger.error(`User "${user.username}" failed to get user with id "${id}`)
                throw new InternalServerErrorException()
            }
    
        }

        async updateItem(
            id:string, 
            status:ShoppingStatus, 
            user: UserEntity,
            item?: string, 
            price?:string ): Promise<ShoppingEntity> {
            const singleItem = await this.getItemWithId(id, user)
            singleItem.item = item
            singleItem.price = price
            singleItem.status = status

            try{
            await singleItem.save()
            }catch(error){
                this.logger.error(`User "${user.username}" failed to update item with id "${id}`)
                throw new InternalServerErrorException()
            }
    
            return singleItem
        }

        deleteItem = async(
            id: string,
            user: UserEntityData 
            ): Promise<string> => {
            const result = await this.delete({id, userId: user.id})
            
            if(!result) {
                throw new NotFoundException()
            }
            
            try{
            return id
            }catch(error){
                this.logger.error(`User "${user.username}" failed to delete item with id "${id}"`)
                throw new InternalServerErrorException()
            }
        }
}