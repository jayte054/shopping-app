import { Injectable } from "@nestjs/common/decorators";
import { ShoppingEntity } from "../entity/shopping.entity";
import { Repository } from "typeorm"

@Injectable()
export class ShoppingRepository extends Repository<ShoppingEntity> {

}