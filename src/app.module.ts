import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { ShoppingModule } from './shoppingModule/shopping.module';

@Module({
  imports: [ShoppingModule,
            TypeOrmModule.forRoot(typeOrmConfig),
  ],
 
})
export class AppModule {}
