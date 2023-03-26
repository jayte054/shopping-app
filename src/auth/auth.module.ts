import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt/jwt-strategy';
import { UserEntity } from './userEntity/user.entity';
import { UserRepository } from './authRepository/auth.repository';

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
