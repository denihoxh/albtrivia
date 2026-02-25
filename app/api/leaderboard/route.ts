import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';
import GameState from '@/lib/models/GameState';
import { successResponse } from '@/lib/utils/api-helpers';

export async function GET(req: NextRequest) {
  await connectDB();
  const agents = await Agent.find().sort({ score: -1 }).limit(20);
  const state = await GameState.findOne();
  return successResponse({
    leaderboard: agents.map(a => ({ name: a.name, score: a.score })),
    round: state?.roundNumber || 0,
  });
}
