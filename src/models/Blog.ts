import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  tags: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'Admin' },
  authorImage: { type: String, default: '' },
  authorBio: { type: String, default: '' },
  date: { type: String, default: '' },
  readTime: { type: String, default: '5 min read' },
  category: { type: String, default: 'General' },
  tags: { type: String, default: '' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
