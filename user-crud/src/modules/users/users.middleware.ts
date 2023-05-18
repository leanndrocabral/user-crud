import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { email, username } = req.body;

    switch (true) {
      case req.method.includes("POST") || req.method.includes("PATCH"):
        const userExists = await this.prisma.user.findFirst({
          where: { OR: [{ email }, { username }] },
        });

        if (userExists) {
          throw new HttpException({ message: 'Username or email already exists.' }, HttpStatus.FORBIDDEN);
        }
        return next();

      case req.method.includes("PATCH") || req.method.includes("DELETE"):
        const userDoesNotExist = await this.prisma.user.findUnique({ where: { id } });

        if (!userDoesNotExist) {
          throw new HttpException({ message: 'User does not exists!' }, HttpStatus.NOT_FOUND);
        }
        return next();
    }
  }
}