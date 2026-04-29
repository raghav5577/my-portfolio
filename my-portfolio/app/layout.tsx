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
