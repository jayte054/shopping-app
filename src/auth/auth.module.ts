import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './authRepository/auth.repository';
import { UserEntity } from './userEntity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: "appSecret54",
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository, UserEntity])
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
