import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { DirectoryService } from "../directoryServices/directory.services";
import { CreateDirectoryEntryDto } from "src/dto/createDirectoryEntityDto/createDirectoryEntryDto";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import { ValidationPipe } from "@nestjs/common";
import { createBrotliDecompress } from "zlib";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { GetUser } from "src/auth/getUser.Decorator/get-user.decorator";

@Controller("directory")
// @UseGuards(AuthGuard())
export class DirectoryController {
    constructor(private directoryService: DirectoryService){}

    @Post("/createentry")
    @UsePipes(ValidationPipe)
    createEntry(@Body() createDirectoryEntryDto: CreateDirectoryEntryDto,
                // @GetUser() user: UserEntity
    ): Promise<DirectoryEntity> {
        return this.directoryService.createEntry(createDirectoryEntryDto)
    }
}