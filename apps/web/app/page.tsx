"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  console.log("Session:", session);

  useEffect(() => {
    if (!session) return;
    // Make a call to the protected API route
    fetch("/api/protected")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Protected API response:", data);
      })
      .catch((error) => {
        console.error("Error fetching protected API:", error);
      });
  }, [session]);

  if (!session) {
    return <button onClick={() => signIn("github")}>Sign in</button>;
  }

  return (
    <>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
