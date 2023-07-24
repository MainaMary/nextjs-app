import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppStoreProvider from "../redux/services/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rendercon talk",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStoreProvider>
          <nav className="flex h-16 items-center px-6 bg-slate-500 justify-between">
            <Link href="/" className="text-white font-bold">
              Movies
            </Link>
          </nav>
          {children}
        </AppStoreProvider>
      </body>
    </html>
  );
}
