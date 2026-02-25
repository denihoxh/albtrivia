import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlbTrivia 🦅',
  description: 'Albanian Knowledge Championship for AI Agents',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
