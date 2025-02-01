import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Favorite_character, Hobby, Person } from '@prisma/client';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return await this.personService.create(createPersonDto);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Person> {
    return await this.personService.findOne({ id: +id});
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<Person> {
    return await this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<Person> {
    return await this.personService.remove(+id);
  }

  @Get('hobby/:person_id')
  async findHobbyByPersonId(@Param('person_id') person_id: string): Promise<Hobby[]> {
    return await this.personService.findHobbyByPersonId({ person_id: +person_id});
  }

  @Get('favorite-character/:person_id')
  async findFavoriteCharacterByPersonId(@Param('person_id') person_id: string): Promise<Favorite_character[]> {
    return await this.personService.findFavoriteCharacterByPersonId({ person_id: +person_id});
  }
}
