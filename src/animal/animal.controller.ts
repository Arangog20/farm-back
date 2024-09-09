import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post('/create')
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.createAnimal(createAnimalDto);
  }

  @Get('/find-all')
  async findAll() {
    return this.animalService.findAll();
  }

  @Get('/find/:_id')
  async findOne(@Param('_id') _id: string) {
    return this.animalService.findOne(_id);
  }

  @Put('/update/:_id')
  async updateAnimal(
    @Param('_id') _id: string,
    @Body() updateDto: UpdateAnimalDto,
  ) {
    return this.animalService.updateAnimal(_id, updateDto);
  }

  @Delete('/delete/:_id')
  async deleteAnimal(@Param('_id') name: string) {
    return this.animalService.deleteAnimal(name);
  }
}
