import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestrictionDto {
  @IsString()
  @IsNotEmpty()
  animalType: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  restrictedTypes: string[];
}
