import mongoose, { Schema, Document } from 'mongoose';

export interface IGameState extends Document {
  questionIndex: number;
  roundNumber: number;
  startedAt: Date;
  active: boolean;
}

const GameStateSchema = new Schema<IGameState>({
  questionIndex: { type: Number, default: 0 },
  roundNumber: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
});

export default mongoose.models.GameState || mongoose.model<IGameState>('GameState', GameStateSchema);
