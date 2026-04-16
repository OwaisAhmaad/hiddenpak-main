import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSetting extends Document {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>({
  siteName: { type: String, default: 'HiddenPak' },
  siteTagline: { type: String, default: 'Travel deeper. Discover hidden beauty.' },
  contactEmail: { type: String, default: 'info@hiddenpak.com' },
  contactPhone: { type: String, default: '' },
  address: { type: String, default: '' },
  facebookUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  twitterUrl: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
