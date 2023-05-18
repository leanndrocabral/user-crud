import { Body, Controller, Get, Post, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from "./users.validation";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Patch(":id")
  async update(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: UpdateUserDto) {
    return await this.usersService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
