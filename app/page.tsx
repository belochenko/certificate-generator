import Image from "next/image";
import Link from "next/link";
import { LoginWithSSORequest } from "@/components/login_with_sso_request";

// <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//   Get started by editing&nbsp;
//   <Link href="/api/python">
//     <code className="font-mono font-bold">api/index.py</code>
//   </Link>
// </p>

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginWithSSORequest />
    </main>
  );
}
