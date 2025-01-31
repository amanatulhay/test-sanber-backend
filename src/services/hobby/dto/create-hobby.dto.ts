import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateHobbyDto {

    @IsString()
    @IsNotEmpty({message : 'name required data'})
    @ApiProperty({example : "Rapping"})
    name : string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    person_id: number;
}
