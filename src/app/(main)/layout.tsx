'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarDesktop } from '@/components/Sidebar';
import SkeletonLoader from '@/components/loader/SkeletonLoader';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready) return (<SkeletonLoader/>);
  if (!authenticated) return null; 
  return (
    <div>
      <SidebarDesktop />
      <main className='ml-[19rem] pt-4'>
        {children}
      </main>
    </div>
  );
}