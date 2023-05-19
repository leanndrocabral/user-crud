import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../database/prisma.service';
import { UserExistsMiddleware, UserPermissionMiddleware } from './users.middleware';
import { SessionAuthorizationMiddleware } from '../sessions/sessions.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
      .apply(SessionAuthorizationMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET })
      .apply(
        SessionAuthorizationMiddleware,
        UserPermissionMiddleware,
        UserExistsMiddleware
      )
      .forRoutes(
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE }
      );
  }
}
