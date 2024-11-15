import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
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
  const isStreamView = typeof window !== 'undefined' && window.location.pathname.includes('/stream-view');

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900`}>
        <AuthProvider>
          {!isStreamView && <Navbar />}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}