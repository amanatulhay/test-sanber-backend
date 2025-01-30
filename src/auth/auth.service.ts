
import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Account as AccountModel } from '@prisma/client';
import { ChangePasswordInputDto, RegisterInputDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private accountsService: AccountsService, 
        private jwtService: JwtService
    ) {}

    async validateAccount(username: string, password: string): Promise<any> {
        const account = await this.accountsService.findOne({ username });
        if (account && (await bcrypt.compare(password, account.password))) {
            const { password, ...result } = account;
            return result;
        }
        return null;
    }

    async login(account: AccountModel) {
        const payload = { username: account.username, account, sub: account.id };
        return {
            access_token: this.jwtService.sign(payload),
            account,
        };
    }

    async register(account: RegisterInputDto) {
        const { username } = account; 
        const usernameFound = await this.accountsService.findOne({username});

        if (usernameFound) {
            return "username is already taken"
        } else {
            try {
                await this.accountsService.createAccount(account)
                return "Register Success"
            } catch(err){
                console.log(err)
                return "Register Failed"
            }
        }
        return 
    }

    async changePassword(account: AccountModel, changedAccount: ChangePasswordInputDto) {
        const { username } = account;
        let data = await this.accountsService.findOne({ username });

        const { password } = changedAccount;
        data = { ...data, password };

        try {
            await this.accountsService.changePassword({ username }, data);
            return 'Change Password Success';
        } catch (err) {
            console.log(err);
            return 'Change Password Failed';
        }
    }
}