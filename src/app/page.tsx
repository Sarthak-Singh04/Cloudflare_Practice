'use client';

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SkeletonLoader from '@/components/loader/SkeletonLoader';

export default function LandingPage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/home');
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (<SkeletonLoader/>); // You can replace this with a more sophisticated loader
  }

  if (authenticated) {
    return null; // Return null to prevent flash of content before redirect
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl">Welcome to Our Platform</h1>
      <p className="mt-4">Join us to explore amazing projects and connect with talented individuals.</p>
      <Link href="/login" className="px-4 py-2 mt-8 rounded bg-blue-500 text-white inline-block">
        Get Started
      </Link>
    </main>
  );
}