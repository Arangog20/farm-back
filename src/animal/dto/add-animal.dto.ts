import { IsString, IsMongoId } from 'class-validator';

export class AddAnimalDto {
  @IsMongoId()
  animalId: string;

  @IsString()
  penName: string;
}
