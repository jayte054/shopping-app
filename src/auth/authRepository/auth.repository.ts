

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

    

    

    //==========user signup =============

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
        return `user ${JSON.stringify(user.username)}  created successfully`
    }

    private async hashedPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

   

    //======= user sign in===============
    

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
      
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder
          .select(['user.id', 'user.username', 'user.password', 'user.salt', 'user.isAdmin'])
          .where('user.username = :username', { username });
      
        const user = await queryBuilder.getOne();
      
        if (user && (await user.validatePassword(password))) {
          return {id:user.id, username:user.username, isAdmin: user.isAdmin};
        } else {
          return null;
        }
      }
   
}