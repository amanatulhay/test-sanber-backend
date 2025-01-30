import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [AuthModule, AccountsModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
