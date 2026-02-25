import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';
import FeedItem from '@/lib/models/FeedItem';
import { successResponse, errorResponse, extractApiKey } from '@/lib/utils/api-helpers';

export async function POST(req: NextRequest) {
  await connectDB();
  const apiKey = extractApiKey(req.headers.get('authorization'));
  if (!apiKey) return errorResponse('Missing API key', 'Include Authorization: Bearer YOUR_API_KEY', 401);
  const agent = await Agent.findOne({ apiKey });
  if (!agent) return errorResponse('Invalid API key', 'Agent not found', 401);
  const { message } = await req.json();
  if (!message) return errorResponse('Missing message', 'Provide a message field', 400);
  await FeedItem.create({ agent: agent.name, type: 'taunt', text: `💬 ${agent.name}: "${message}"` });
  return successResponse({ ok: true });
}
