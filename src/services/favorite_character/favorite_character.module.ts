import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FavoriteCharacterService } from './favorite_character.service';
import { FavoriteCharacterController } from './favorite_character.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ParamMiddleware } from './middleware/param-middleware.middleware';
import { PersonIdMiddleware } from './middleware/person-id-middleware.middleware';

@Module({
  controllers: [FavoriteCharacterController],
  providers: [FavoriteCharacterService, JwtService, PrismaService],
})
export class FavoriteCharacterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(ParamMiddleware)
        .forRoutes(
          { path: '/favorite-character/:id', method: RequestMethod.GET },
          { path: '/favorite-character/:id', method: RequestMethod.PUT },
          { path: '/favorite-character/:id', method: RequestMethod.DELETE },
        )
        .apply(PersonIdMiddleware)
        .forRoutes(
          { path: '/favorite-character', method: RequestMethod.POST },
          { path: '/favorite-character/:id', method: RequestMethod.PUT }
        );
  }
}
