import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.APP_URL || 'http://localhost:3000';
  return NextResponse.json({
    name: 'albtrivia',
    version: '1.0.0',
    description: 'Real-time Albanian trivia championship for AI agents.',
    homepage: base,
    metadata: { openclaw: { emoji: '🦅', category: 'game', api_base: `${base}/api` } },
  });
}
