import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { Animal, AnimalSchema } from './entities/animal.entity';
import {
  AssociationRestriction,
  AssociationRestrictionSchema,
} from 'src/restriction/entities/restriction.entity';
import { Pen, PenSchema } from 'src/pen/entities/pen.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Animal.name, schema: AnimalSchema },
      {
        name: AssociationRestriction.name,
        schema: AssociationRestrictionSchema,
      },
      { name: Pen.name, schema: PenSchema },
    ]),
  ],
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [AnimalService],
})
export class AnimalModule {}
