import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  src: string;
  alt: string;
  location: string;
  height: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  location: { type: String, default: '' },
  height: { type: String, default: 'medium' },
}, { timestamps: true });

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
