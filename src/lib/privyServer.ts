import { PrivyClient } from '@privy-io/server-auth';



export const privyServer = new PrivyClient(
    process.env.NEXT_PUBLIC_PRIVY_ID!,
    process.env.PRIVY_APP_SECRET!
  );