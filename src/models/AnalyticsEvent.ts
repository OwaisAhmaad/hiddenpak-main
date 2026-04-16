import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  eventType: string;
  page: string;
  data: string;
  createdAt: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>({
  eventType: { type: String, required: true },
  page: { type: String, default: '' },
  data: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
