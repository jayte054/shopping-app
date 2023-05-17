import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "../profileService/profileService";
import { Logger, ValidationPipe } from "@nestjs/common";
import { CreateProfileDto } from "src/dto/createProfileDto/createProfileDto";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { GetUser } from "src/auth/getUser.Decorator/get-user.decorator";
import { ProfileEntity } from "src/profile/profileEntity/profile.entity";

@Controller("profile")
@UseGuards(AuthGuard())
export class ProfileController {
    private logger = new Logger("ProfileController")
    constructor(private profileService: ProfileService) {}

    
    @Post("/createprofile")
    @UsePipes(ValidationPipe)
    createProfile(@Body() createProfileDto: CreateProfileDto,
    @GetUser() user: UserEntity
    ):Promise<ProfileEntity> {

        this.logger.verbose(`User Profile ${user.username} has created a profile, Data: ${createProfileDto}`)
        return this.profileService.createProfile(createProfileDto, user)

         }
}