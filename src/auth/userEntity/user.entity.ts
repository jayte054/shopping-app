

import {BaseEntity, Entity,Unique, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {v4 as uuid} from "uuid"
import * as bcrypt from "bcrypt"
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";

@Entity()
@Unique(["username"])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    salt: string;

    @OneToMany(type => ShoppingEntity, item => item.user, {eager: true})
    items: ShoppingEntity[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}