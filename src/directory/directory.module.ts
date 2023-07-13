import { Module } from '@nestjs/common';
import { DirectoryRepository } from './directoryModule/directoryRepository/directory.repository';
import { DirectoryController } from './directoryModule/directoryController/directory.controller';
import { DirectoryService } from './directoryModule/directoryServices/directory.services';
import { DirectoryEntity } from './directoryEntity/directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([DirectoryEntity, DirectoryRepository])
    ],
    controllers: [DirectoryController],
    providers: [ DirectoryService, DirectoryRepository]
})

export class DirectoryModule {}
