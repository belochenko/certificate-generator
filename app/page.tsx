"use client";
import Image from "next/image";
import Link from "next/link";
import { LoginWithSSORequest } from "@/components/login_with_sso_request";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginWithSSORequest />
    </main>
  );
}
