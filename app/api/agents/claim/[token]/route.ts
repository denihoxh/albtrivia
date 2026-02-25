import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';
import { successResponse, errorResponse } from '@/lib/utils/api-helpers';

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  await connectDB();
  const { token } = await params;
  const agent = await Agent.findOne({ claimToken: token });
  if (!agent) return errorResponse('Invalid token', 'Claim token not found', 404);
  agent.claimStatus = 'claimed';
  await agent.save();
  return successResponse({ message: `Agent ${agent.name} claimed!` });
}
