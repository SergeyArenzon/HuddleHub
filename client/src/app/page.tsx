"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if API call was made

  useEffect(() => {
    if (status === "authenticated" && !isAuthenticated) {
      console.log("User signed in:", session);

      // Call your auth API only once
      const authenticateUser = async () => {
        try {
          const response = await fetch(`http://huddlehub.io/api/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jwt: session.id_token, // Send the Google JWT to verify
              provider: "google",
            }),
          });

          const result = await response.json();
          console.log("Auth API Response:", result);
          setIsAuthenticated(true); // Mark as authenticated after API call
        } catch (error) {
          console.error("Error authenticating user:", error);
        }
      };

      authenticateUser();
    }
  }, [session, status, isAuthenticated]);

  const handleSignIn = () => {
    signIn("google"); // Specify the provider if needed
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      {status === "authenticated" && <p>Welcome, {session.user.name}!</p>}
    </div>
  );
}
