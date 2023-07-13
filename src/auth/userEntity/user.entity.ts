

import {BaseEntity, Entity,Unique, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm"
import {v4 as uuid} from "uuid"
import * as bcrypt from "bcrypt"
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";
import { ProfileEntity } from "../../profile/profileEntity/profile.entity";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";

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

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(type => ShoppingEntity, item => item.user, {eager: true})
    items: ShoppingEntity[];


    @OneToMany(() => ProfileEntity, (profile) => profile.user, {eager : true}) // Adjust the relationship according to your entity names and configuration
    profiles: ProfileEntity[];

    @OneToMany(() => DirectoryEntity, (directory) => directory.user, {eager : true}) // Adjust the relationship according to your entity names and configuration
    directory: DirectoryEntity[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}