// src/app/components/LogoutButton.tsx

'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout, authenticated } = usePrivy();
  const router = useRouter();

  const handleLogout = async () => {
    if (authenticated) {
      try {
        await logout();
        // In future we can add a call to your backend to clear any server-side session data
        // await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/'); 
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  if (!authenticated) {
    return null; // Don't show the button if the user is not authenticated
  }

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
}