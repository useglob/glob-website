import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Anton
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Glob",
  description: "Glob is a censorship-resistant, scalable and verifiable storage protocol built on top of Celestia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${anton.variable}`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="antialiased font-sans">
        {children}
        <Toaster className="dark" />
      </body>
    </html>
  );
}