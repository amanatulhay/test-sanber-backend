import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ParamMiddlewareMiddleware } from './param-middleware/param-middleware.middleware';

@Module({
  controllers: [PersonController],
  providers: [PersonService, JwtService, PrismaService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParamMiddlewareMiddleware)
      .forRoutes(
        { path: '/person/:id', method: RequestMethod.GET },
        { path: '/person/:id', method: RequestMethod.PUT },
        { path: '/person/:id', method: RequestMethod.DELETE },
      );
  }
}
