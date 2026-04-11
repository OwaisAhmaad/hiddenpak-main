import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  /** Cloudinary secure URL */
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  publicId: string;

  /** Alt text (accessibility / SEO) */
  @Prop({ default: '' })
  alt: string;

  /** Caption shown in gallery UI */
  @Prop({ default: '' })
  caption: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: 'medium', enum: ['tall', 'medium', 'short'] })
  height: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
