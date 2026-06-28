"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          GitHub Automation Bot
        </h1>

        <button
          onClick={() =>
            signIn("github", {
              callbackUrl: "/dashboard",
            })
          }
          className="rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}