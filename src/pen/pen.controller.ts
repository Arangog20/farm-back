import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PenService } from './pen.service';
import { CreatePenDto } from './dto/create-pen.dto';
import { Animal } from 'src/animal/entities/animal.entity';
import { Types } from 'mongoose';
import { Pen } from './entities/pen.entity';
import { UpdatePenDto } from './dto';

@Controller('pen')
export class PenController {
  constructor(private readonly penService: PenService) {}

  @Post('/create')
  async createPen(@Body() createPenDto: CreatePenDto) {
    try {
      return await this.penService.createPen(createPenDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/add-animal')
  async addAnimalToPen(
    @Body('animalId') animalId: Types.ObjectId,
    @Body('penName') penName: string,
  ): Promise<{ pen: Pen; animals: Animal[] }> {
    try {
      return await this.penService.addAnimalToPen(animalId, penName);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/find-all')
  async findAll() {
    return this.penService.findAll();
  }

  @Get('/find/:name')
  async findOne(@Param('name') name: string) {
    return this.penService.findOne(name);
  }

  @Put('/update/:name')
  async updateRestriction(
    @Param('name') name: string,
    @Body() updateDto: UpdatePenDto,
  ) {
    return this.penService.updateRestriction(name, updateDto);
  }

  @Delete('/delete/:name')
  async deleteRestriction(@Param('name') name: string) {
    return this.penService.deletePen(name);
  }
  @Get('/age-range/:penName')
  async getAgeRange(@Param('penName') penName: string) {
    return this.penService.getAgeRangeInPen(penName);
  }
}
