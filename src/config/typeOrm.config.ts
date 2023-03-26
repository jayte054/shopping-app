import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username:"postgres",
    password: "1234",
    database: "shoppingappmanager",
    entities: [ShoppingEntity, UserEntity],
    synchronize: true
}