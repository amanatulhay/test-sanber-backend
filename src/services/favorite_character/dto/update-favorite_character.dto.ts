import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteCharacterDto } from './create-favorite_character.dto';

export class UpdateFavoriteCharacterDto extends PartialType(CreateFavoriteCharacterDto) {}
