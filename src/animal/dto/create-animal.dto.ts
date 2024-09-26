import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnimalDto {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  animalType: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  restrictions?: string[];

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  penId?: string;
}
