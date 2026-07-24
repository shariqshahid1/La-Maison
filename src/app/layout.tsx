import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "La Maison - Premium Fine Dining Experience",
  description: "Experience exquisite fine dining with curated menus and impeccable service. Book your table at La Maison today!",
  keywords: ["restaurant", "fine dining", "food", "gourmet", "reservation", "la maison"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#0a0f1a] font-sans">
        <ClientProviders>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
