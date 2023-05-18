import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../database/prisma.service';
import { UserExistsMiddleware } from "./users.middleware";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PATCH })
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
