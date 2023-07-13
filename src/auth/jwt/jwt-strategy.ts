import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserRepository } from "../authRepository/auth.repository";
import { JwtPayload } from "../jwt-interface/jwt-payload.interface";
import { UserEntity } from "../userEntity/user.entity";
import * as config from "config"

const jwtConfig = config.get("jwt")
//==============jwt strategy==================

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){ super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || jwtConfig.secret
    })}

    async validate(payload: JwtPayload): Promise<UserEntity> {
        console.log(payload)
        const {username, id} = payload

        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder
        .select(['user.id', 'user.username', 'user.password', 'user.salt', 'user.isAdmin'])
        .where('user.username = :username', { username: username, id })

        const user = await queryBuilder.getOne()

        // const user = await this.userRepository.findOne({
        //     where: {username},
        //     select: ["id", "username", "password", "salt"] 
        // })


        if(!user) {
            throw new UnauthorizedException()
        }
        const response = user.id
        console.log(response)

        return user
    }
}