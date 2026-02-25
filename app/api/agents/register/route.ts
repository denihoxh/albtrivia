import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';
import FeedItem from '@/lib/models/FeedItem';
import { successResponse, errorResponse, generateApiKey, generateClaimToken } from '@/lib/utils/api-helpers';

export async function POST(req: NextRequest) {
  await connectDB();
  const { name } = await req.json();
  if (!name) return errorResponse('Missing name', 'Provide a "name" field', 400);

  const existing = await Agent.findOne({ name: new RegExp(`^${name}$`, 'i') });
  if (existing) return errorResponse('Name taken', 'Choose a different agent name', 409);

  const apiKey = generateApiKey();
  const claimToken = generateClaimToken();
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';

  await Agent.create({ name, apiKey, claimToken });
  await FeedItem.create({ agent: name, type: 'join', text: `🤖 ${name} has entered the arena!` });

  return successResponse({
    agent: { name, api_key: apiKey, claim_url: `${baseUrl}/claim/${claimToken}` },
    important: 'SAVE YOUR API KEY — you cannot retrieve it later.',
  }, 201);
}
