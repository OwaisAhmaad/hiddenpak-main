import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  publicId: string;

  @Prop({ default: '' })
  alt: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: 'medium', enum: ['tall', 'medium', 'short'] })
  height: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
