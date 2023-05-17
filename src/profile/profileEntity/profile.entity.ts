import { UserEntity } from "src/auth/userEntity/user.entity";
import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm"
import {v4 as uuid } from "uuid"

@Entity()
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;


    @ManyToOne(() => UserEntity, (user) => user.profiles, {eager: false}) // Adjust the relationship according to your entity names and configuration
    user: UserEntity;

    @Column()
    userId: string
}