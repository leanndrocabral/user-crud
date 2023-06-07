import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [UsersModule, SessionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
