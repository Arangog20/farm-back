import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePenDto } from './dto/create-pen.dto';
import { Pen } from './entities/pen.entity';
import { Animal } from 'src/animal/entities/animal.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePenDto } from './dto/update-pen.dto';
import { RestrictionService } from 'src/restriction/restriction.service';

@Injectable()
export class PenService {
  constructor(
    @InjectModel(Pen.name) private readonly penModel: Model<Pen>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    private readonly restrictionService: RestrictionService,
  ) {}

  async createPen(createPenDto: CreatePenDto): Promise<Pen> {
    const existingPen = await this.penModel
      .findOne({ name: createPenDto.name })
      .exec();

    if (existingPen) {
      throw new HttpException(
        `Pen with name ${createPenDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPen = new this.penModel(createPenDto);
    return newPen.save();
  }

  async addAnimalToPen(
    animalId: Types.ObjectId,
    penName: string,
  ): Promise<{ pen: Pen; animals: Animal[] }> {
    const pen = await this.penModel.findOne({ name: penName }).exec();

    if (!pen) {
      throw new HttpException(
        `Pen with name "${penName}" not found`, // Uso de backticks ` `
        HttpStatus.NOT_FOUND,
      );
    }

    const currentNumberOfAnimals = pen.animals.length;
    if (currentNumberOfAnimals >= pen.capacity) {
      throw new HttpException(
        `Pen with name "${penName}" is full. Please create a new pen.`, // Uso de backticks ` `
        HttpStatus.BAD_REQUEST,
      );
    }

    const animalObjectId = new Types.ObjectId(animalId);

    if (
      pen.animals.some((existingAnimalId) =>
        new Types.ObjectId(existingAnimalId).equals(animalObjectId),
      )
    ) {
      throw new HttpException(
        `Animal with ID "${animalId}" is already in pen "${penName}"`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const animal = await this.animalModel.findById(animalId).exec();
    if (!animal) {
      throw new HttpException(
        `Animal with ID "${animalId}" not found`, // Uso de backticks ` `
        HttpStatus.NOT_FOUND,
      );
    }

    const animalToAdd = await this.animalModel.findById(animalObjectId);
    if (!animalToAdd) {
      throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);
    }

    // Obtener todos los animales en el corral
    const existingAnimals = await this.animalModel.find({
      _id: { $in: pen.animals },
    });

    // Obtener restricciones del tipo de animal desde el módulo de restricciones
    const restriction =
      await this.restrictionService.getRestrictionsForAnimalType(
        animalToAdd.animalType,
      );

    if (restriction) {
      const isIncompatible = existingAnimals.some((existingAnimal) =>
        restriction.restrictedTypes.includes(existingAnimal.animalType),
      );

      if (isIncompatible) {
        throw new HttpException(
          `Animal of type "${animalToAdd.animalType}" cannot be added to pen "${pen.name}" because it is incompatible with existing animals.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    pen.animals.push(animalId);
    await pen.save();

    const animalsInPen = await this.animalModel
      .find({ _id: { $in: pen.animals } })
      .exec();

    return { pen, animals: animalsInPen };
  }

  async findAll(): Promise<Pen[]> {
    const existingPens = await this.penModel.find().exec();
    if (!existingPens)
      throw new HttpException('Pens not found', HttpStatus.NOT_FOUND);
    return existingPens;
  }

  async findOne(name: string): Promise<Pen> {
    const normalizedName = name.toLowerCase();

    // Buscar el corral por su nombre y poblar la información de los animales
    const pen = await this.penModel
      .findOne({ name: normalizedName })
      .populate('animals')
      .exec();

    if (!pen) {
      throw new HttpException('Pen not found', HttpStatus.NOT_FOUND);
    }

    return pen;
  }

  async updateRestriction(name: string, updateDto: UpdatePenDto): Promise<Pen> {
    const pen = await this.penModel
      .findOneAndUpdate({ name: name }, { $set: updateDto }, { new: true })
      .exec();
    if (!pen) throw new NotFoundException('pen not found');
    return pen;
  }

  async deletePen(name: string): Promise<Pen> {
    const pen = await this.penModel.findOneAndDelete({ name: name });
    if (!pen) throw new NotFoundException('Pen not found');
    return pen;
  }

  async getAgeRangeInPen(
    penName: string,
  ): Promise<{ minAge: number; maxAge: number }> {
    const pen = await this.penModel
      .findOne({ name: penName })
      .populate('animals')
      .exec();

    if (!pen) {
      throw new NotFoundException(
        `El corral con el nombre "${penName}" no fue encontrado.`,
      );
    }

    const animals = await this.animalModel
      .find({ _id: { $in: pen.animals } })
      .exec();

    if (!animals.length) {
      throw new NotFoundException(
        `No se encontraron animales en el corral "${penName}".`,
      );
    }

    const ages = animals.map((animal) => animal.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    return { minAge, maxAge };
  }
}
