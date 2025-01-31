import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Hobby } from '@prisma/client';

@Controller('hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    return await this.hobbyService.create(createHobbyDto);
  }

  @Get()
  async findAll(): Promise<Hobby[]> {
    return await this.hobbyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hobby>  {
    return await this.hobbyService.findOne({ id: +id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateHobbyDto: UpdateHobbyDto
  ): Promise<Hobby> { 
    return await this.hobbyService.update(+id, updateHobbyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<Hobby> {
    return await this.hobbyService.remove(+id);
  }
}
