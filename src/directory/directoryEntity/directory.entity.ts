import { UserEntity } from "src/auth/userEntity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from "uuid"

@Entity()
export class DirectoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    number: string;

    @Column()
    walletId: string;

    @Column()
    address: string;

    @Column(
        // { type: 'decimal', precision: 10, scale: 8, nullable: true }
        ) 
    latitude: string;
  
    @Column(
        // { type: 'decimal', precision: 10, scale: 8, nullable: true }
    ) 
    longitude: string;

    @ManyToOne(() => UserEntity, (user) => user.directory, {eager: false})
    user: UserEntity;

    @Column()
    userId?: string;

}
