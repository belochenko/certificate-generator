"use client";
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Certificate generator by IT2S',
//   description: 'Certificate generator by IT2S',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
