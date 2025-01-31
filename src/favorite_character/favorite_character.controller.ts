import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { FavoriteCharacterService } from './favorite_character.service';
import { CreateFavoriteCharacterDto } from './dto/create-favorite_character.dto';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite_character.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Favorite_character } from '@prisma/client';

@Controller('favorite-character')
export class FavoriteCharacterController {
  constructor(private readonly favoriteCharacterService: FavoriteCharacterService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createFavoriteCharacterDto: CreateFavoriteCharacterDto): Promise<Favorite_character> {
    return await this.favoriteCharacterService.create(createFavoriteCharacterDto);
  }

  @Get()
  async findAll(): Promise<Favorite_character[]> {
    return await this.favoriteCharacterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Favorite_character> {
    return await this.favoriteCharacterService.findOne({ id: +id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string, 
    @Body() updateFavoriteCharacterDto: UpdateFavoriteCharacterDto
  ): Promise<Favorite_character> {
    return await this.favoriteCharacterService.update(+id, updateFavoriteCharacterDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<Favorite_character> {
    return await this.favoriteCharacterService.remove(+id);
  }
}
