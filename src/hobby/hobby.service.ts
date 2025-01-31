import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Hobby, Prisma } from '@prisma/client';

@Injectable()
export class HobbyService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService
    ) {}

  async create(createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    return await this.prisma.hobby.create({
			data: createHobbyDto,
		});
  }

  async findAll(
    where?: Prisma.HobbyWhereInput,
    include?: Prisma.HobbyInclude
  ): Promise<Hobby[]> {
    return await this.prisma.hobby.findMany({
			where: { ...where },
			include,
		});
  }

  async findOne(
    where?: Prisma.HobbyWhereInput,
    include?: Prisma.HobbyInclude
  ): Promise<Hobby> {
    return await this.prisma.hobby.findFirst({
			where: { ...where },
			include,
		});
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto): Promise<Hobby> {
    return await this.prisma.hobby.update({
			where: { id },
			data: updateHobbyDto,
		});
  }

  async remove(id: number): Promise<Hobby> {
    return await this.prisma.hobby.delete({
			where: { id },
		});
  }
}
