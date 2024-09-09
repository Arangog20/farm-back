import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssociationRestriction } from './entities/restriction.entity';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { UpdateRestrictionDto } from './dto/update-restriction.dto';

@Injectable()
export class RestrictionService {
  constructor(
    @InjectModel(AssociationRestriction.name)
    private associationRestrictionModel: Model<AssociationRestriction>,
  ) {}

  async createRestriction(
    createDto: CreateRestrictionDto,
  ): Promise<AssociationRestriction> {
    createDto.animalType = createDto.animalType.toLowerCase();
    createDto.restrictedTypes = createDto.restrictedTypes.map((type) =>
      type.toLowerCase(),
    );
    if (
      ![
        'vaca',
        'cerdo',
        'gallina',
        'oveja',
        'caballo',
        'cabra',
        'pato',
        'ganso',
        'burro',
        'conejo',
        'toro',
        'llama',
      ].includes(createDto.animalType)
    ) {
      throw new HttpException('Invalid animal type', HttpStatus.BAD_REQUEST);
    }
    const existingRestriction = await this.associationRestrictionModel.findOne({
      animalType: createDto.animalType,
      restrictedTypes: createDto.restrictedTypes,
    });

    if (existingRestriction) {
      throw new HttpException(
        ` Note with id ${createDto.animalType} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newRestriction = new this.associationRestrictionModel(createDto);
    return newRestriction.save();
  }

  async findAll(): Promise<AssociationRestriction[]> {
    const existingRestriction = await this.associationRestrictionModel
      .find()
      .exec();
    if (!existingRestriction)
      throw new HttpException('Restrictions not found', HttpStatus.NOT_FOUND);
    return existingRestriction;
  }

  async findOne(animalType: string): Promise<AssociationRestriction> {
    const normalizedAnimalType = animalType.toLowerCase();
    const restriction = await this.associationRestrictionModel
      .findOne({ animalType: normalizedAnimalType })
      .exec();
    if (!restriction)
      throw new HttpException('Restriction not found', HttpStatus.NOT_FOUND);
    return restriction;
  }

  async updateRestriction(
    animalType: string,
    updateDto: UpdateRestrictionDto,
  ): Promise<AssociationRestriction> {
    const restriction = await this.associationRestrictionModel
      .findOneAndUpdate(
        { animalType: animalType },
        { $set: updateDto },
        { new: true },
      )
      .exec();
    if (!restriction) throw new NotFoundException('Restriction not found');
    return restriction;
  }

  async deleteRestriction(animalTyp: string): Promise<AssociationRestriction> {
    const restriction = await this.associationRestrictionModel.findOneAndDelete(
      { animalType: animalTyp },
    );
    if (!restriction) throw new NotFoundException('Restriction not found');
    return restriction;
  }

  async getRestrictionsForAnimalType(
    animalType: string,
  ): Promise<AssociationRestriction | null> {
    return this.associationRestrictionModel.findOne({ animalType });
  }
}
