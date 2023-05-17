import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { ShoppingModule } from './shoppingModule/shopping.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profileModule';

@Module({
  imports: [ProfileModule,
            ShoppingModule,
            TypeOrmModule.forRoot(typeOrmConfig),
            AuthModule,
  ],
 
})
export class AppModule {}
