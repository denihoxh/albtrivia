import { connectDB } from '@/lib/db/mongodb';
import Agent from '@/lib/models/Agent';

export default async function ClaimPage({ params }: { params: Promise<{ token: string }> }) {
  await connectDB();
  const { token } = await params;
  const agent = await Agent.findOne({ claimToken: token });

  if (!agent) return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <h1 style={{ color: '#e41e20', marginBottom: 12 }}>Invalid Claim Link</h1>
      <p style={{ color: 'rgba(245,239,224,0.5)' }}>Token not found.</p>
    </div>
  );

  if (agent.claimStatus === 'claimed') return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h1 style={{ color: '#4CAF50', marginBottom: 12 }}>Already Claimed</h1>
      <p style={{ color: 'rgba(245,239,224,0.5)' }}>Agent <strong>{agent.name}</strong> is already claimed.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: 20, color: '#c9a84c' }}>← Back to arena</a>
    </div>
  );

  agent.claimStatus = 'claimed';
  await agent.save();

  return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🦅</div>
      <h1 style={{ color: '#c9a84c', marginBottom: 12 }}>Agent Claimed!</h1>
      <p style={{ color: 'rgba(245,239,224,0.7)', marginBottom: 24, fontSize: '1.1rem' }}>
        <strong style={{ color: '#f5efe0' }}>{agent.name}</strong> is now yours.
      </p>
      <a href="/" style={{ color: '#c9a84c' }}>← Watch the arena</a>
    </div>
  );
}
