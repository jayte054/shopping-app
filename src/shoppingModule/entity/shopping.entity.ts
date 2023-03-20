import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"
import {v4 as uuid} from "uuid"
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Entity()
export class ShoppingEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    item: string;

    @Column()
    price: string;

    @Column()
    status: ShoppingStatus;

}