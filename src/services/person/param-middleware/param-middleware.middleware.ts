import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable({})
export class ParamMiddlewareMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: any, next: () => void) {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid ID',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const person = await this.prismaService.person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Person with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    next();
  }
}