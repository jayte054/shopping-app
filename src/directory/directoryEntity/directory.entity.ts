import { UserEntity } from "src/auth/userEntity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from "uuid"

Entity()
export class DirectoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    number: string;

    @Column()
    walletId: string;

    // @ManyToOne(() => UserEntity, (user) => user.directory, {eager: false})
    // user: UserEntity;

    @Column()
    userId: string;
}
