import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Favorite_character, Hobby, Person, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
	) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person>  {
    return await this.prisma.person.create({
			data: createPersonDto,
		});
  }

  async findAll(
    where?: Prisma.PersonWhereInput,
		include?: Prisma.PersonInclude
  ): Promise<Person[]> {
    return await this.prisma.person.findMany({
			where: { ...where },
			include,
		});
  }

  async findOne(
    where?: Prisma.PersonWhereInput,
		include?: Prisma.PersonInclude
  ): Promise<Person> {
    return await this.prisma.person.findFirst({
			where: { ...where },
			include,
		});
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
		return await this.prisma.person.update({
			where: { id },
			data: updatePersonDto,
		});
	}

  async remove(id: number): Promise<Person> {
		return await this.prisma.person.delete({
			where: { id },
		});
	}

  async findHobbyByPersonId(
	where?: Prisma.HobbyWhereInput,
	include?: Prisma.HobbyInclude
	): Promise<Hobby[]> {
	return await this.prisma.hobby.findMany({
			where: { ...where },
			include,
		});
	}
	
  async findFavoriteCharacterByPersonId(
	where?: Prisma.Favorite_characterWhereInput,
	include?: Prisma.Favorite_characterInclude
	): Promise<Favorite_character[]> {
	return await this.prisma.favorite_character.findMany({
			where: { ...where },
			include,
		});
	}
}
