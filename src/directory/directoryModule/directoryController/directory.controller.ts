import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { DirectoryService } from "../directoryServices/directory.services";
import { CreateDirectoryEntryDto } from "src/dto/createDirectoryEntityDto/createDirectoryEntryDto";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import { Logger, ValidationPipe } from "@nestjs/common";
import { createBrotliDecompress } from "zlib";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { GetUser } from "src/auth/getUser.Decorator/get-user.decorator";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Directory")
@Controller("directory")
@UseGuards(AuthGuard())
export class DirectoryController {
    private logger = new Logger("DirectoryController")
    constructor(private directoryService: DirectoryService){}

    @ApiOperation({summary:"Create Entry into Directory"})
    @ApiParam({ name: "createDirectoryEntryDto", type: CreateDirectoryEntryDto })
    @ApiParam({ name: "user", description: "User Entity", type: "string" })
    @ApiResponse({status: 201, description: "entry created successfully"})
    @Post("/createentry")
    @UsePipes(ValidationPipe)
    createEntry(@Body() createDirectoryEntryDto: CreateDirectoryEntryDto,
                @GetUser() user: UserEntity
    ): Promise<DirectoryEntity| string> {
        this.logger.verbose("entry created successfully")
        return this.directoryService.createEntry(createDirectoryEntryDto, user)
    }

    @ApiOperation({summary: "Retrieve Directory from database"})
    @ApiResponse({status: 201, description:"Directory successfully retrieved"})
    @Get("/getentry")
    async getDirectory(): Promise<DirectoryEntity> {
        this.logger.verbose(`Directory successfully retrieved`)
        return this.directoryService.getEntry()
    }
}