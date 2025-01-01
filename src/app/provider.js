"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";

// AuthProvider component with session management and loading states
export const AuthProvider = ({ children }) => {
  // Get session and status from useSession
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle the session loading state
  if (status === "loading") {
    return <div>Loading...</div>; // Show loading message/spinner
  }

  // Handle the unauthenticated state
  if (status === "unauthenticated") {
    // Optionally, redirect to login if the user is unauthenticated
    router.push("/login");
    return <div>You are not authenticated. Redirecting to login...</div>; // Fallback UI
  }

  // You can use session data here to access user info or make conditional rendering
  if (session) {
    console.log("User session:", session);
    // Optionally, display the logged-in user's name or other session details
    // E.g., Show user info or any UI based on the session
  }

  // Ensure that children are passed and render them inside the SessionProvider
  if (!children) {
    console.error("AuthProvider requires children to render.");
    return <div>No content available.</div>;  // Fallback UI
  }

  // Return the SessionProvider with the actual children
  return <SessionProvider>{children}</SessionProvider>;
};
