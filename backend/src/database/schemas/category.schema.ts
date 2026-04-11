import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

export enum CategoryType {
  VILLAGE = 'village',
  CITY = 'city',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ required: true, enum: CategoryType, default: CategoryType.OTHER })
  type: CategoryType;

  @Prop({ default: '' })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ type: 1 });
CategorySchema.index({ slug: 1 }, { unique: true });
