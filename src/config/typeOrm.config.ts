import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/userEntity/user.entity";
import { ShoppingEntity } from "src/shoppingModule/entity/shopping.entity";
import { DirectoryEntity } from "src/directory/directoryEntity/directory.entity";
import { ProfileEntity } from "src/profile/profileEntity/profile.entity";
import * as config from "config"
import { PasswordResetTokenEntity } from "src/passwordResetTokenModule/reset-token.entity/passwordResetToken.enitity";

const dbConfig = config.get("db")
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [ShoppingEntity, ProfileEntity, DirectoryEntity, UserEntity, PasswordResetTokenEntity],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    ssl : true,
    extra : {
    ssl : {
      rejectUnauthorized: false
    }
}
}