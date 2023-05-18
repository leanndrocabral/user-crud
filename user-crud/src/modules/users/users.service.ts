import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto, UserWithoutPassword } from './users.validation';
import { plainToClass } from 'class-transformer'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const password = await bcrypt.hash(data.password, 10);

    const response = await this.prisma.user.create({ data: { ...data, password } });
    return plainToClass(UserWithoutPassword, response);
  }

  async findAll() {
    const response = await this.prisma.user.findMany();
    return plainToClass(UserWithoutPassword, response);
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      const password = await bcrypt.hash(data.password, 10);

      const response = await this.prisma.user.update({
        data: { ...data, password },
        where: { id },
      });
      return plainToClass(UserWithoutPassword, response);
    }

    const response = await this.prisma.user.update({ data, where: { id } });
    return plainToClass(UserWithoutPassword, response);
  }

  async delete(id: string) {
    const response = await this.prisma.user.delete({ where: { id } });
    return plainToClass(UserWithoutPassword, response);
  }
}
