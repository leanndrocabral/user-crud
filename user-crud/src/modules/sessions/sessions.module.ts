import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  SessionAuthorizationMiddleware,
  SessionLoginMiddleware,
} from './sessions.middleware';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService, JwtService],
})
export class SessionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionAuthorizationMiddleware)
      .forRoutes({ path: 'sessions', method: RequestMethod.GET })
      .apply(SessionLoginMiddleware)
      .forRoutes({ path: 'sessions', method: RequestMethod.POST });
  }
}
