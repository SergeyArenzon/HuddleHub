'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

// Create a client
const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </QueryClientProvider>
  );
}
