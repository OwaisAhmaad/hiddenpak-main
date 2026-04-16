import mongoose, { Schema, Document } from 'mongoose';

export interface IPlace extends Document {
  slug: string;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string;
  rating: number;
  altitude: string;
  bestTime: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  region: { type: String, default: 'Pakistan' },
  description: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  image: { type: String, default: '' },
  gallery: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  altitude: { type: String, default: '' },
  bestTime: { type: String, default: '' },
  category: { type: String, default: '' },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);
