import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssociationRestriction } from 'src/restriction/entities/restriction.entity';
import { Animal } from './entities/animal.entity';
import { Pen } from 'src/pen/entities/pen.entity';
import { UpdateAnimalDto } from './dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(AssociationRestriction.name)
    private readonly associationRestrictionModel: Model<AssociationRestriction>,
    @InjectModel(Pen.name) private readonly penModel: Model<Pen>,
  ) {}

  async createAnimal(createDto: CreateAnimalDto): Promise<Animal> {
    const existingType = await this.associationRestrictionModel
      .findOne({
        animalType: createDto.animalType.toLowerCase(),
      })
      .exec();

    if (!existingType) {
      throw new HttpException(
        'No restriction found for this animal type',
        HttpStatus.BAD_REQUEST,
      );
    }

    const restrictedTypes = existingType.restrictedTypes;

    const newAnimal = new this.animalModel({
      name: createDto.name,
      animalType: createDto.animalType,
      age: createDto.age,
      penId: createDto.penId,
      restrictions: restrictedTypes,
    });

    await newAnimal.save();

    return newAnimal;
  }

  async findAll(): Promise<Animal[]> {
    const existingAnimal = await this.animalModel.find().exec();
    if (!existingAnimal)
      throw new HttpException('Animals not found', HttpStatus.NOT_FOUND);
    return existingAnimal;
  }

  async findOne(_id: string): Promise<Animal> {
    const existingId = await this.animalModel.findById(_id).exec();
    if (!existingId)
      throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);
    return existingId;
  }

  async updateAnimal(_id: string, updateDto: UpdateAnimalDto): Promise<Animal> {
    const animalExisting = await this.animalModel
      .findOneAndUpdate({ _id: _id }, { $set: updateDto }, { new: true })
      .exec();
    if (!animalExisting) throw new NotFoundException('Animal not found');
    return animalExisting;
  }

  async deleteAnimal(_id: string): Promise<Animal> {
    const animal = await this.animalModel.findByIdAndDelete(_id);
    if (!animal) throw new NotFoundException('Animal not found');
    return animal;
  }
}
