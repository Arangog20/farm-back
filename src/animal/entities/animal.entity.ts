import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Animal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  animalType: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: [String], default: [] })
  restrictions: string[];

  @Prop({ type: Types.ObjectId, ref: 'Pen' })
  pen: Types.ObjectId;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
