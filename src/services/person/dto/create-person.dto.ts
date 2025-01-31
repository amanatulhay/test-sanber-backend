import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePersonDto {

    @IsString()
    @IsNotEmpty({message : 'name required data'})
    @ApiProperty({example : "Eminem"})
    name : string;

    @IsString()
    @IsNotEmpty({message : "phone required data"})
    @ApiProperty({example : "089510200102"})
    phone : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message : 'email required data'})
    @ApiProperty({example : "eminem@thegoat.com"})
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message : 'image required data'})
    @ApiProperty({example : "https://eminem.jpg"})
    image : string;
}
