import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "La Cucina - Fine Italian Dining Experience",
  description: "Experience the finest Italian cuisine with authentic flavors and modern presentation. Book your table now!",
  keywords: ["restaurant", "italian", "food", "dining", "pizza", "pasta"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #f59e0b',
            },
          }}
        />
      </body>
    </html>
  );
}
