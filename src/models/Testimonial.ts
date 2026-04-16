import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String, default: '' },
  avatar: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  text: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
