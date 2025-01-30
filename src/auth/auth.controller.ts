import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ChangePasswordInputDto,
  LoginInputDto,
  RegisterInputDto,
} from "./dto/create-auth.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Body() account: LoginInputDto) {
    // account = req.user;
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(@Body() account: RegisterInputDto) {
    return this.authService.register(account);
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  @ApiBearerAuth()
  async changePassword(
    @Request() req,
    @Body() changedAccount: ChangePasswordInputDto
  ) {
    return this.authService.changePassword(req.user, changedAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

}
