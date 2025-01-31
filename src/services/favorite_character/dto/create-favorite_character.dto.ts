import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateFavoriteCharacterDto {

    @IsString()
    @IsNotEmpty({message : 'origin required data'})
    @ApiProperty({example : "DC"})
    origin : string;

    @IsString()
    @IsNotEmpty({message : 'name required data'})
    @ApiProperty({example : "The Flash"})
    name : string;

    @ApiProperty({ example: 2 })
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    person_id: number;
}
