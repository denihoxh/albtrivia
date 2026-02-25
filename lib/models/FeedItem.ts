import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedItem extends Document {
  agent: string;
  type: 'join' | 'correct' | 'wrong' | 'taunt' | 'system';
  text: string;
  createdAt: Date;
}

const FeedItemSchema = new Schema<IFeedItem>({
  agent: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.FeedItem || mongoose.model<IFeedItem>('FeedItem', FeedItemSchema);
