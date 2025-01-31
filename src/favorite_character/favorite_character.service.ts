import { Injectable } from '@nestjs/common';
import { CreateFavoriteCharacterDto } from './dto/create-favorite_character.dto';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite_character.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Favorite_character, Prisma } from '@prisma/client';

@Injectable()
export class FavoriteCharacterService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async create(createFavoriteCharacterDto: CreateFavoriteCharacterDto): Promise<Favorite_character> {
    return await this.prisma.favorite_character.create({
			data: createFavoriteCharacterDto,
		});
  }

  async findAll(
    where?: Prisma.Favorite_characterWhereInput,
    include?: Prisma.Favorite_characterInclude
  ): Promise<Favorite_character[]> {
    return await this.prisma.favorite_character.findMany({
			where: { ...where },
			include,
		});
  }

  async findOne(
    where?: Prisma.Favorite_characterWhereInput,
    include?: Prisma.Favorite_characterInclude
  ): Promise<Favorite_character> {
    return await this.prisma.favorite_character.findFirst({
			where: { ...where },
			include,
		});
  }

  async update(id: number, updateFavoriteCharacterDto: UpdateFavoriteCharacterDto): Promise<Favorite_character> {
    return await this.prisma.favorite_character.update({
			where: { id },
			data: updateFavoriteCharacterDto,
		});
  }

  async remove(id: number): Promise<Favorite_character> {
    return await this.prisma.favorite_character.delete({
			where: { id },
		});
  }
}
