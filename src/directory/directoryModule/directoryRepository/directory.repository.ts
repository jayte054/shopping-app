import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import {  CreateDirectoryEntryDto } from "src/dto/createDirectoryEntityDto/createDirectoryEntryDto";
import { DataSource, FindOneOptions, Repository } from "typeorm";
import {v4 as uuid} from "uuid"

@Injectable()
export class DirectoryRepository extends Repository<DirectoryEntity>{
    private logger = new Logger(`directoryRepository`)
    constructor(private dataSource: DataSource){
        super(DirectoryEntity, dataSource.createEntityManager())
    }

    async createEntry(
        createDirectoryEntryDto: CreateDirectoryEntryDto,
        user: UserEntity | any 
    ): Promise<DirectoryEntity| any>{
        
        
            const {
                name,
                number,
                walletId,
                address,
                latitude,
                longitude
             } = createDirectoryEntryDto

            //  const roundedLatitude = Math.round(latitude * 1e8) / 1e8;
            //  const roundedLongitude = Math.round(longitude * 1e8) / 1e8;

     const entry = new DirectoryEntity()
     entry.id = uuid()
     entry.name = name
     entry.number = number
     entry.walletId = walletId
     entry.address = address
     entry.user = user
     entry.latitude = latitude
     entry.longitude = longitude
 
     try{
        // if(user.isAdmin === true) {
         await entry.save()
        // } else {
        //     return "admin priviledge required"
        // }
        
     }catch(error){
         this.logger.error("entry unsuccessful")
         throw new InternalServerErrorException()
     }
     return {name: entry.name, 
             number:entry.number, 
             walletId:entry.walletId, 
             address:entry.address, 
             latitude:entry.latitude, 
             longitude: entry.longitude }
   
    }

    async getEntry(): Promise<DirectoryEntity>{
        const options: FindOneOptions<DirectoryEntity> = {};

        const directory: any = await this.find(options)
        if(!directory){
            this.logger.error(`Directory not found`);
            throw new NotFoundException(`Directory not found`)
        }

        return directory
    }

}