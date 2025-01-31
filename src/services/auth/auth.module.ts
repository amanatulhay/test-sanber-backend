import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsModule } from 'src/services/accounts/accounts.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireIn },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
