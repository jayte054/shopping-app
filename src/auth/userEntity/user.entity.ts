

import {BaseEntity, Entity,Unique, PrimaryGeneratedColumn, Column} from "typeorm"
import {v4 as uuid} from "uuid"
import * as bcrypt from "bcrypt"

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

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}