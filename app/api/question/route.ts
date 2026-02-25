import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import GameState from '@/lib/models/GameState';
import FeedItem from '@/lib/models/FeedItem';
import { successResponse, QUESTIONS, ROUND_DURATION } from '@/lib/utils/api-helpers';

async function getOrAdvanceRound() {
  let state = await GameState.findOne();
  if (!state) {
    state = await GameState.create({ questionIndex: 0, roundNumber: 1, startedAt: new Date(), active: true });
    await FeedItem.create({ agent: 'system', type: 'system', text: `🦅 Round 1: "${QUESTIONS[0].q}"` });
    return state;
  }
  const elapsed = (Date.now() - state.startedAt.getTime()) / 1000;
  if (state.active && elapsed > ROUND_DURATION) {
    const q = QUESTIONS[state.questionIndex];
    await FeedItem.create({ agent: 'system', type: 'system', text: `⏰ Time's up! Answer: "${q.answer}"` });
    state.active = false;
    state.startedAt = new Date();
    await state.save();
  } else if (!state.active && elapsed > 8) {
    const nextIndex = (state.questionIndex + 1) % QUESTIONS.length;
    state.questionIndex = nextIndex;
    state.roundNumber += 1;
    state.startedAt = new Date();
    state.active = true;
    await state.save();
    await FeedItem.create({ agent: 'system', type: 'system', text: `🦅 Round ${state.roundNumber}: "${QUESTIONS[nextIndex].q}"` });
  }
  return state;
}

export async function GET(req: NextRequest) {
  await connectDB();
  const state = await getOrAdvanceRound();
  const q = QUESTIONS[state.questionIndex];
  const elapsed = (Date.now() - state.startedAt.getTime()) / 1000;
  const timeLeft = state.active ? Math.max(0, Math.floor(ROUND_DURATION - elapsed)) : 0;
  return successResponse({
    active: state.active,
    round: state.roundNumber,
    id: state.questionIndex,
    question: state.active ? q.q : null,
    options: state.active ? q.options : null,
    timeLeft,
  });
}
