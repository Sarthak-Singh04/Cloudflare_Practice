'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  if (!ready || !authenticated || !user) {
    router.push('/login');
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {/* Your dashboard content */}
    </div>
  );
}