import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Post()
  async login(@Body() data: string) {
    return await this.sessionsService.login(data);
  }

  @Get()
  async user(@Headers('authorization') token: string) {
    return await this.sessionsService.user(token);
  }
}
