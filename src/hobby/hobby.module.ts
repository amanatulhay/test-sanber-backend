import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ParamMiddleware } from './middleware/param-middleware.middleware';
import { PersonIdMiddleware } from './middleware/person-id-middleware.middleware';

@Module({
  controllers: [HobbyController],
  providers: [HobbyService, JwtService, PrismaService],
})
export class HobbyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParamMiddleware)
      .forRoutes(
        { path: '/hobby/:id', method: RequestMethod.GET },
        { path: '/hobby/:id', method: RequestMethod.PUT },
        { path: '/hobby/:id', method: RequestMethod.DELETE },
      )
      .apply(PersonIdMiddleware)
      .forRoutes(
        { path: '/hobby', method: RequestMethod.POST },
        { path: '/hobby/:id', method: RequestMethod.PUT }
      );
  }
}
