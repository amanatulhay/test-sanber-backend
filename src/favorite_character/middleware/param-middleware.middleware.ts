import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable({})
export class ParamMiddleware implements NestMiddleware {
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

    const favorite_character = await this.prismaService.favorite_character.findUnique({
      where: { id },
    });

    if (!favorite_character) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `favorite_character with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    next();
  }
}