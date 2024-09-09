import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { UpdateRestrictionDto } from './dto/update-restriction.dto';
import { RestrictionService } from './restriction.service';

@Controller('restrictions')
export class RestrictionController {
  constructor(private readonly restrictionService: RestrictionService) {}

  @Post('/create')
  async createRestriction(@Body() createDto: CreateRestrictionDto) {
    return this.restrictionService.createRestriction(createDto);
  }

  @Get('/find-all')
  async findAll() {
    return this.restrictionService.findAll();
  }

  @Get('/find/:animalType')
  async findOne(@Param('animalType') animalType: string) {
    return this.restrictionService.findOne(animalType);
  }

  @Put('/update/:animalType')
  async updateRestriction(
    @Param('animalType') animalType: string,
    @Body() updateDto: UpdateRestrictionDto,
  ) {
    return this.restrictionService.updateRestriction(animalType, updateDto);
  }

  @Delete('/delete/:animalTyp')
  async deleteRestriction(@Param('animalTyp') animalTyp: string) {
    return this.restrictionService.deleteRestriction(animalTyp);
  }
}
