import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserRepository } from "../authRepository/auth.repository";
import { JwtPayload } from "../jwt-interface/jwt-payload.interface";
import { UserEntity } from "../userEntity/user.entity";

//==============jwt strategy==================

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){ super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "appSecret54"
    })}

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const {username} = payload

        const user = await this.userRepository.findOne({
            where: {username}
        })

        if(!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}