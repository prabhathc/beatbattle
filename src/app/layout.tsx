import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeatBattle.gg - Music Producer Battles & Feedback",
  description: "Host and participate in music producer battles and feedback sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if the current URL contains '/stream-view'
  const isStreamView = typeof window !== 'undefined' && window.location.pathname.includes('/stream-view');

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900`}>
        <UserProvider>
          {!isStreamView && <Navbar />}
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}