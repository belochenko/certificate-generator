// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function LoginWithSSORequest() {
  return (
    <div key="1" className="flex h-screen w-full items-center justify-center">
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
            <Button
              className="w-full"
              variant="outline"
              // onClick={handleLogin}
            >
              <ChromeIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
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
