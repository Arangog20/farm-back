import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Pen extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Animal' }], default: [] })
  animals: Types.Array<Types.ObjectId>;

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ required: false, type: Date })
  updatedAt: Date;
}

export const PenSchema = SchemaFactory.createForClass(Pen);
