"use client";

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//   Get started by editing&nbsp;
//   <Link href="/api/python">
//     <code className="font-mono font-bold">api/index.py</code>
//   </Link>
// </p>

export default function Home() {
  //const session = await getServerSession(authConfig);

//  console.log("Session: ", session);

//  if (session) return console.log("Session: ", session, "!!!!");
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div key="1" className="flex w-full items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your message to the Admin to access your account. Provide
                your organization assosiated email.
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="request-access">Request Access</Label>
                <Textarea
                  className="min-h-[100px]"
                  id="request-access"
                  placeholder="Introduce your full name, company email and organization"
                  required
                />
              </div>
              <Button className="w-full">Request Access</Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div>
              <Button className="w-full" variant="outline" onClick={handleClick}>
                <ChromeIcon/>
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const handleClick = () => {
      signIn("google");
};

function ChromeIcon() {
  return (
    <svg
      className="mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}