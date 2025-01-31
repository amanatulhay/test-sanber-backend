import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { PersonModule } from './person/person.module';
import { HobbyModule } from './hobby/hobby.module';
import { FavoriteCharacterModule } from './favorite_character/favorite_character.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('./public/img/'),
      serveRoot: '/public/img/' 
    }),  
    AuthModule, 
    AccountsModule, 
    PersonModule, 
    HobbyModule, 
    FavoriteCharacterModule, 
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
