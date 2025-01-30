import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}
  

  async findOne(accountWhereUniqueInput: Prisma.AccountWhereUniqueInput): Promise<Account | undefined> {
    return this.prisma.account.findUnique({
      where: accountWhereUniqueInput,
    });
  }

  async createAccount(accountsCreateInput: Prisma.AccountCreateInput): Promise<Account | undefined> {

    const password = await bcrypt.hash(accountsCreateInput.password, 10);
    return this.prisma.account.create({
      data: {...accountsCreateInput, password, updatedAt: new Date()},
    });
  }

  async changePassword(accountsWhereUniqueInput: Prisma.AccountWhereUniqueInput, accountsUpdateInput: Prisma.AccountUpdateInput): Promise<Account | undefined> {
    
    const password = await bcrypt.hash(accountsUpdateInput.password, 10);
    return this.prisma.account.update({
      data: {password, updatedAt: new Date()},
      where: accountsWhereUniqueInput,
    });
  }
}
