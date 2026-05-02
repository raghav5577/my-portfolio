import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingAvatar from "@/components/FloatingAvatar";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raghav Karnatak | Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Raghav Karnatak — Full Stack Developer & AI Engineer specializing in Next.js, React, Node.js, and AI/ML systems.",
  keywords: [
    "Raghav Karnatak",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalError = console.error;
              const originalWarn = console.warn;
              
              console.error = (...args) => {
                if (typeof args[0] === 'string' && (args[0].includes('Hydration failed') || args[0].includes('There was an error while hydrating') || args[0].includes('Text content did not match. Server:'))) return;
                originalError(...args);
              };
              
              console.warn = (...args) => {
                if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) return;
                originalWarn(...args);
              };
            `
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a]" suppressHydrationWarning>
        <Navbar />
        <FloatingAvatar />
        <SmoothScroll>
          <main className="flex-grow">{children}</main>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
