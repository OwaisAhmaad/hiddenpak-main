import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema({ timestamps: true })
export class Place {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  longDescription: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: '' })
  imagePublicId: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({ type: [String], default: [] })
  galleryPublicIds: string[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: '' })
  altitude: string;

  @Prop({ default: '' })
  bestTime: string;

  @Prop({ default: true })
  published: boolean;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
PlaceSchema.index({ name: 'text', description: 'text' });
PlaceSchema.index({ region: 1 });
