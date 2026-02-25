import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  apiKey: string;
  claimToken: string;
  claimStatus: 'pending_claim' | 'claimed';
  score: number;
  lastActive: Date;
}

const AgentSchema = new Schema<IAgent>({
  name: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true, unique: true },
  claimToken: { type: String, required: true, unique: true },
  claimStatus: { type: String, default: 'pending_claim' },
  score: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);
