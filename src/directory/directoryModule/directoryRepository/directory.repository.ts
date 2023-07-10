import { InternalServerErrorException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import {  CreateDirectoryEntryDto } from "src/dto/createDirectoryEntityDto/createDirectoryEntryDto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class DirectoryRepository extends Repository<DirectoryEntity>{
    constructor(private dataSource: DataSource){
        super(DirectoryEntity, dataSource.createEntityManager())
    }

    async createEntry(
        createDirectoryEntryDto: CreateDirectoryEntryDto,
        // user: UserEntity
    ): Promise<DirectoryEntity>{
        const {name,
               number,
               walletId
            } = createDirectoryEntryDto

    const entry = new DirectoryEntity()
    entry.name = name
    entry.number = number
    entry.walletId = walletId
    // entry.user = user

    try{
        await entry.save()
    }catch(error){
        console.log(error)
        throw new InternalServerErrorException()
    }

    return entry 

    }

}