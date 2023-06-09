import { BaseEntity, Column, OneToMany } from "typeorm";
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";
import { UserEntity } from "./user.entity";
import * as bcrypt from "bcrypt"
import { ProfileEntity } from "src/profile/profileEntity/profile.entity";

export interface UserEntityData  {
    id: string;
    username: string;
    
    password: string
    
    salt: string;
    // @OneToMany(type => ShoppingEntity, item => item.user, {eager: true})
    items: ShoppingEntity[];
    
    // @OneToMany(() => ProfileEntity, (profile) => profile.user, {eager : true}) // Adjust the relationship according to your entity names and configuration
    profiles: ProfileEntity[];

    // async validatePassword(password: string): Promise<boolean> {
    //     const hash = await bcrypt.hash(password, this.salt)
    //     return hash === this.password
    // }
}