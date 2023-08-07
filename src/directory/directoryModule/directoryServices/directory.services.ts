import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DirectoryRepository } from "../directoryRepository/directory.repository";
import { CreateDirectoryEntryDto } from "src/dto/createDirectoryEntityDto/createDirectoryEntryDto";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import { UserEntity } from "src/auth/userEntity/user.entity";

@Injectable()
export class DirectoryService {
    constructor(
        @InjectRepository(DirectoryRepository)
        private directoryRepository: DirectoryRepository
    ){}

    async createEntry(
        createDirectoryEntryDto:CreateDirectoryEntryDto,
        user: UserEntity
    ): Promise<DirectoryEntity| string> {
        if(user.isAdmin === true){
            // console.log(user.isAdmin)
        return this.directoryRepository.createEntry(createDirectoryEntryDto, user)
    }else{
        // console.log(user)
      return  "admin privilege required"
    }
    }

    async getEntry(): Promise<DirectoryEntity>{
        return this.directoryRepository.getEntry()
    }
}