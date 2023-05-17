import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "../profileRepository/profile.repository";
import { CreateProfileDto } from "src/dto/createProfileDto/createProfileDto";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { ProfileEntity } from "src/profile/profileEntity/profile.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileRepository)
        private profileReposistory: ProfileRepository
    ){}

    async createProfile(
        createProfileDto: CreateProfileDto,
        user: UserEntity
    ): Promise<ProfileEntity> {
        return this.profileReposistory.createProfile(createProfileDto, user)
    }
}