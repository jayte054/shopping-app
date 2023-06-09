import { Injectable } from "@nestjs/common/decorators";
import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { CreateProfileDto } from "src/dto/createProfileDto/createProfileDto";
import { ProfileEntity } from "src/profile/profileEntity/profile.entity";
import {  Repository,DataSource, FindOneOptions } from "typeorm";

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
    private logger = new Logger("profileRepository")
    constructor(private dataSource: DataSource){
        super(ProfileEntity, dataSource.createEntityManager())
    }

    async getProfile(profileId: any): Promise<ProfileEntity> {
        const options: FindOneOptions<ProfileEntity> = {
          where: { userId: profileId },
        };
        const profile: ProfileEntity = await this.findOne(options);
      
        if (!profile) {
          this.logger.error(`Profile not found`);
          throw new NotFoundException('Profile not found');
        }
      
        return profile;
      }

    async createProfile(
        createProfileDto: CreateProfileDto,
        user: UserEntity
    ): Promise<ProfileEntity> {
        const {firstName, 
               lastName,
               phoneNumber,
               address} = createProfileDto
        
        const profile = new ProfileEntity()
        profile.firstName = firstName
        profile.lastName = lastName
        profile.phoneNumber = phoneNumber
        profile.address = address
        profile.user = user
        console.log(profile.user)

        try{
            await profile.save()
        }catch(error) {
            console.log(error)
            this.logger.error(`user ${user.username} failed to create profile, Data: ${createProfileDto}`)
            throw new InternalServerErrorException()
        }

        delete profile.user
        return  profile
    }

    
}