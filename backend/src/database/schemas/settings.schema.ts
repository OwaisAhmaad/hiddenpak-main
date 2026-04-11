import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ default: 'HiddenPak' }) siteName: string;
  @Prop({ default: 'Discover Pakistan\'s Hidden Gems' }) siteTagline: string;
  @Prop({ default: 'hello@hiddenpak.com' }) contactEmail: string;
  @Prop({ default: '+92-300-0000000' }) contactPhone: string;
  @Prop({ default: 'Islamabad, Pakistan' }) address: string;
  @Prop({ default: 'https://facebook.com/HiddenPak' }) facebookUrl: string;
  @Prop({ default: 'https://instagram.com/hiddenpak' }) instagramUrl: string;
  @Prop({ default: 'https://twitter.com/HiddenPak' }) twitterUrl: string;
  @Prop({ default: 'https://youtube.com/@HiddenPak' }) youtubeUrl: string;
  @Prop({ default: true }) maintenanceMode: boolean;
  @Prop({ default: true }) allowRegistration: boolean;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
