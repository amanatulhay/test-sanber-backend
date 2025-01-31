import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';


export class CreateAuthDto {}

export class RegisterInputDto {
 
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginInputDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ChangePasswordInputDto {

  @ApiProperty()
  @IsString()
  password: string;
}