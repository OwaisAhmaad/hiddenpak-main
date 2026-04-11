import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema({ timestamps: true })
export class Place {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: '' })
  region: string;

  @Prop({ default: '' })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  longDescription: string;

  /** Free-text location / address, e.g. "Gilgit-Baltistan, Pakistan" */
  @Prop({ default: '' })
  location: string;

  /** Primary cover image URL (from Cloudinary) */
  @Prop({ default: '' })
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
