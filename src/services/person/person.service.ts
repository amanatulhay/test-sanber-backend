import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Person, Prisma } from '@prisma/client';
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
}
