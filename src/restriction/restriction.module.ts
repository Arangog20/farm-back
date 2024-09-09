import { Module } from '@nestjs/common';
import { RestrictionService } from './restriction.service';
import { RestrictionController } from './restriction.controller';
import {
  AssociationRestriction,
  AssociationRestrictionSchema,
} from './entities/restriction.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssociationRestriction.name,
        schema: AssociationRestrictionSchema,
      },
    ]),
  ],
  providers: [RestrictionService],
  controllers: [RestrictionController],
  exports: [RestrictionService],
})
export class RestrictionModule {}
