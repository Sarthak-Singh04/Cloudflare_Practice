'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

// Dynamically import AuthProviders, with SSR disabled
const AuthProviders = dynamic(() => import('../lib/AuthProvider'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviders>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </AuthProviders>
  );
}