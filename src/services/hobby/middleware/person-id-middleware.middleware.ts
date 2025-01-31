import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable({})
export class PersonIdMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: any, next: () => void) {
    const person_id = parseInt(req.body.person_id);
    if (!person_id || isNaN(person_id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid person_id',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const person = await this.prismaService.person.findUnique({
      where: { id: person_id},
    });

    if (!person) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Person with person_id ${person_id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    next();
  }
}