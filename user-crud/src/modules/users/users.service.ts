import {
  CreateUserDto,
  PaginateParamsFilterDto,
  QueryParamsFiltersDto,
  UpdateUserDto,
  UserWithoutPasswordDto
} from './users.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer'
import { paginateClient } from 'prisma-paginate';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const password = await hash(data.password, 10);

    const response = await this.prisma.user.create({ data: { ...data, password } });
    return plainToClass(UserWithoutPasswordDto, response);
  }

  async findAll(queriesParams: QueryParamsFiltersDto, paginateParams: PaginateParamsFilterDto) {
    const { page = 1, limit = 10 } = paginateParams;

    const paginator = paginateClient(this.prisma);
    const response = await paginator.user.paginate(
      {
        where: { AND: [queriesParams] },
        select: {
          id: true,
          name: true,
          username: true,
          email: true
        }
      },
      { page, limit }
    );
    return response;
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      const password = await hash(data.password, 10);

      const response = await this.prisma.user.update({
        data: { ...data, password },
        where: { id },
      });
      return plainToClass(UserWithoutPasswordDto, response);
    }

    const response = await this.prisma.user.update({ data, where: { id } });
    return plainToClass(UserWithoutPasswordDto, response);
  }

  async delete(id: string) {
    const response = await this.prisma.user.delete({ where: { id } });
    return plainToClass(UserWithoutPasswordDto, response);
  }
}
