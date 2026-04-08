import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ default: '' })
  coverImagePublicId: string;

  @Prop({ default: 'HiddenPak Team' })
  author: string;

  @Prop({ default: '' })
  authorImage: string;

  @Prop({ default: '' })
  authorBio: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: true })
  published: boolean;

  @Prop({ default: '5 min read' })
  readTime: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
