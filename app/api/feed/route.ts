import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import FeedItem from '@/lib/models/FeedItem';
import { successResponse } from '@/lib/utils/api-helpers';

export async function GET(req: NextRequest) {
  await connectDB();
  const items = await FeedItem.find().sort({ createdAt: -1 }).limit(50);
  return successResponse({ feed: items.reverse() });
}
