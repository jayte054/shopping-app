import { UserEntityData } from "src/auth/userEntity/userEntityData";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {v4 as uuid} from "uuid"
import { ShoppingStatus } from "../ShoppingStatusEnum/shopping.status.enum";

@Entity()
export class ShoppingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    item: string;

    @Column()
    price: string;

    @Column()
    status: ShoppingStatus;

    @ManyToOne(type => UserEntity, user => user.items, {eager: false})
    user: UserEntity

    @Column({ default: new Date() })
    date: string;

    @Column()
    userId: string

}