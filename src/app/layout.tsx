import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes'

import "./globals.css";
import CoreProvider from "@/providers/core-provider";
import SmoothScroll from "@/components/Lenis/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codeleap Network",
  description: "A responsive social feed application built with Next.js, TanStack Query, and TypeScript. Features include username-based persistent authentication, real-time post creation, optimistic updates on edit and delete, infinite scroll pagination, and dark/light mode. The project was built with a focus on code reusability, clean architecture, and end-user experience, with smooth animations powered by Framer Motion throughout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroll>
            <CoreProvider>{children}</CoreProvider>
          </SmoothScroll>
        </ThemeProvider>

      </body>
    </html>
  );
}
