import { UserEntity } from "src/auth/userEntity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PasswordResetTokenEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    username:string;

    @Column()
    resetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;

    @ManyToOne(() => UserEntity, user => user.resetToken, {eager: false})
    user: UserEntity;

    @Column()
    userId: string;
}