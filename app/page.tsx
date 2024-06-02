"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/ChromeLogo";

// import { signIn, auth } from "@/auth"
import { signIn } from "next-auth/react"

export default function Home() {
  // const session = auth();

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div key="1" className="flex w-full items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
          <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Login</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your message to the Admin to access your account.
                    Provide your organization associated email.
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
                    onClick={() => signIn("google", { redirectTo: "/login" })}
                  >
                    <ChromeIcon />
                    Sign in with Google
                  </Button>
                </div>
          </div>
        </div>
      </div>
    </main>
  );
}
