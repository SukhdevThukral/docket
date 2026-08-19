import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroFont = localFont({
  src: "./fonts/PragmaticaExtendedBook.otf",
  variable: "--font-hero",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Docket - every academic deadline, one dashboard",
  description: "A personal tracker for college applications, scholarships - documents, deadlines in a single dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${heroFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
