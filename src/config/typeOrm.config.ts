import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username:"postgres",
    password: "1234",
    database: "shoppingappmanager",
    entities: [ShoppingEntity],
    synchronize: true
}