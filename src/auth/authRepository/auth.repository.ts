

import {  Injectable } from "@nestjs/common";
import { MailerService } from "src/mailer/mailer.service";
import { UserEntity } from "../userEntity/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common/exceptions";
import {Repository, DataSource} from "typeorm"
import { AuthCredentialsDto } from "../dto/authCredentials.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        private dataSource: DataSource,
        private readonly mailerService: MailerService
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
        await this.mailerService.sendWelcomeMail( user.username)
        console.log(user)
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

    // async validateUserPassword(authCredentialsdto: AuthCredentialsDto): Promise<string> {
    //     const {username, password} = authCredentialsdto 

    //     const user = await this.findOne({
    //         where: {username},
    //         select: ['id', 'username', 'password', 'salt'],
    //     })
    //     console.log(user)

    //     if(user && (await user.validatePassword(password))) {
    //         return user.username 
    //     } else {
    //         return null
    //     }
    // }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
      
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder
          .select(['user.id', 'user.username', 'user.password', 'user.salt'])
          .where('user.username = :username', { username });
      
        const user = await queryBuilder.getOne();
      
        if (user && (await user.validatePassword(password))) {
          return {id:user.id, username:user.username};
        } else {
          return null;
        }
      }
   
}