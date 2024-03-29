import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt/jwt-strategy';
import { UserEntity } from './userEntity/user.entity';
import { UserRepository } from './authRepository/auth.repository';
import * as config from "config"
import { MailerModule } from 'src/mailer/mailer.module';
import { PasswordResetTokenEntity } from 'src/passwordResetTokenModule/reset-token.entity/passwordResetToken.enitity';

const jwtConfig = config.get("jwt")
@Module({
  imports: [
    MailerModule,
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository, UserEntity, PasswordResetTokenEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, 
              UserRepository,
              JwtStrategy 
            ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
