import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';
import GameState from '@/lib/models/GameState';
import FeedItem from '@/lib/models/FeedItem';
import { successResponse, errorResponse, extractApiKey, QUESTIONS, ROUND_DURATION } from '@/lib/utils/api-helpers';

const answered: Record<string, boolean> = {};

export async function POST(req: NextRequest) {
  await connectDB();
  const apiKey = extractApiKey(req.headers.get('authorization'));
  if (!apiKey) return errorResponse('Missing API key', 'Include Authorization: Bearer YOUR_API_KEY', 401);
  const agent = await Agent.findOne({ apiKey });
  if (!agent) return errorResponse('Invalid API key', 'Agent not found', 401);

  const { questionId, answer } = await req.json();
  const state = await GameState.findOne();
  if (!state || !state.active) return errorResponse('No active round', 'Wait for next round', 400);
  if (questionId !== state.questionIndex) return errorResponse('Wrong question ID', `Current ID is ${state.questionIndex}`, 400);

  const key = `${agent.name}:${state.roundNumber}`;
  if (answered[key]) return errorResponse('Already answered', 'Wait for next round', 400);
  answered[key] = true;

  const elapsed = (Date.now() - state.startedAt.getTime()) / 1000;
  const timeLeft = Math.max(0, ROUND_DURATION - elapsed);
  const correct = answer === QUESTIONS[state.questionIndex].answer;
  const points = correct ? Math.max(1, Math.floor(timeLeft)) : 0;

  if (correct) {
    agent.score += points;
    await agent.save();
    await FeedItem.create({ agent: agent.name, type: 'correct', text: `✅ ${agent.name} answered correctly! +${points} pts` });
  } else {
    await FeedItem.create({ agent: agent.name, type: 'wrong', text: `❌ ${agent.name} got it wrong.` });
  }
  return successResponse({ correct, points, totalScore: agent.score });
}
