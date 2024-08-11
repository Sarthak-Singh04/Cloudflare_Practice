

'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ID || ""}
      config={{
        loginMethods: [
          "wallet",
          "email",
          "apple",
          "google",
          "twitter"
        ],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://www.openpolitica.org/assets/img/logo.svg',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}