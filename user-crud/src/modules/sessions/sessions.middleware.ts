import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class SessionAuthorizationMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new HttpException(
        { message: 'Token not provided!' },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const token = authToken.split(' ')[1];
      this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
    } catch (err) {
      throw new HttpException({ message: err }, HttpStatus.FORBIDDEN);
    }
    next();
  }
}

@Injectable()
export class SessionLoginMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });

      const comparePassword = await compare(password, user.password);
      if (!comparePassword) {
        throw new HttpException(
          { message: 'Incorrect email or password.' },
          HttpStatus.FORBIDDEN,
        );
      }
      req.body = user.id;
    } catch (err) {
      throw new HttpException(
        { message: 'Incorrect email or password.' },
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
