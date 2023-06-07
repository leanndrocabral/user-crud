import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserWithoutPasswordDto } from '../users/users.dto';

interface JwtPayload {
  [key: string]: string;
}

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(id: string) {
    const access_token = this.jwtService.sign(
      { sub: id },
      { expiresIn: '48h', secret: process.env.SECRET_KEY },
    );
    return { access_token };
  }

  async user(token: string) {
    const authToken = token.split(' ')[1];
    const { sub } = this.jwtService.decode(authToken) as JwtPayload;

    const response = await this.prisma.user.findUnique({ where: { id: sub } });
    return plainToClass(UserWithoutPasswordDto, response);
  }
}
