

import {  Injectable } from "@nestjs/common";
import { UserEntity } from "../userEntity/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common/exceptions";
import {Repository, DataSource} from "typeorm"
import { AuthCredentialsDto } from "../dto/authCredentials.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        private dataSource: DataSource
    ){
        super(UserEntity, dataSource.createEntityManager())
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto

        const user = new UserEntity()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashedPassword(password, user.salt)

        try{
        await user.save()
        }catch(error){
            if(error.code === "23505") {
                throw new ConflictException("username already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }
        return "user created successfully"
    }

    private async hashedPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    //=======sign in===============

    async validateUserPassword(authCredentialsdto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsdto 

        const user = await this.findOne({
            where: {username}
        })

        if(user && await user.validatePassword(password)) {
            return user.username 
        } else {
            return null
        }
    }
}