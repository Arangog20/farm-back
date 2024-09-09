import { Module } from '@nestjs/common';
import { PenService } from './pen.service';
import { PenController } from './pen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pen, PenSchema } from './entities/pen.entity';
import { Animal, AnimalSchema } from 'src/animal/entities/animal.entity';
import { AnimalModule } from 'src/animal/animal.module';
import { RestrictionModule } from 'src/restriction/restriction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pen.name, schema: PenSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
    AnimalModule,
    RestrictionModule,
  ],
  controllers: [PenController],
  providers: [PenService],
})
export class PenModule {}
