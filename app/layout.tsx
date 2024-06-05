"use client";
import "./globals.css";
import { Inter } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/authguard";

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Certificate generator by IT2S',
//   description: 'Certificate generator by IT2S',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
    </SessionProvider>
  );
}
