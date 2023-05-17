import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ProfileController } from "./profileModule/profileController/profileController";
import { ProfileService } from "./profileModule/profileService/profileService";
import { ProfileRepository } from "./profileModule/profileRepository/profile.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "./profileEntity/profile.entity";

@Module({
    imports:[
        AuthModule,
        TypeOrmModule.forFeature([ProfileEntity, ProfileRepository])
    ],
    controllers:[ProfileController],
    providers:[ProfileService, ProfileRepository]
})

export class ProfileModule {}