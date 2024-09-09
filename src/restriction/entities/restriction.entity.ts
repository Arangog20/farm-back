import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AssociationRestriction extends Document {
  @Prop({ required: true })
  animalType: string;

  @Prop({ type: [String], required: true })
  restrictedTypes: string[];

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ required: false, type: Date })
  updatedAt: Date;
}

export const AssociationRestrictionSchema = SchemaFactory.createForClass(
  AssociationRestriction,
);
