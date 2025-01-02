'use client';

import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Card from './components/Card';
import { GoogleSignInButton } from './components/authButtons';

export default function Home() {
  const { data: session, status } = useSession();

  const fetchz = async () => {
    if (status !== 'authenticated' && session && 'accessToken' in session) return;
    const res = await axios.get('http://localhost:8080/api/auth/protected', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Include the access token
      },
      withCredentials: true,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-300">
      <Card>
        <div className="flex flex-col justify-between">
          <div className="w-[500px] h-[600px] flex flex-col gap-6">
            <div className="text-[20px] text-center font-semibold">HuddleHub</div>
            <div className="flex flex-col gap-4">
              <GoogleSignInButton />
            </div>
            <Button>click</Button>
            {(session && session.user) && <div aria-hidden="true" onClick={() => signOut()} className="text-[20px] text-center font-semibold cursor-pointer">Sign Out</div>}
          </div>
          <div className="text-[12px] text-center">Powered by HuddleHub</div>
        </div>
      </Card>
      <button type="button" onClick={fetchz}>sadasd</button>
    </main>
  );
}
