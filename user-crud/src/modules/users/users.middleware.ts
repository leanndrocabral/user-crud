import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  [key: string]: string;
}

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, username } = req.body;

    const userExists = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (userExists) {
      throw new HttpException({ message: 'Username or email already exists.' }, HttpStatus.FORBIDDEN);
    }
    next();
  }
}

@Injectable()
export class UserPermissionMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization.split(" ")[1];
    const { sub } = this.jwtService.decode(authToken) as JwtPayload;

    const userExists = await this.prisma.user.findUnique({ where: { id: req.params.id } });
    if (!userExists) {
      throw new HttpException({ message: 'User does not exists!' }, HttpStatus.NOT_FOUND);
    }

    if (sub !== req.params.id) {
      throw new HttpException({ message: 'You are not allowed!' }, HttpStatus.BAD_REQUEST);
    }
    next();
  }
}