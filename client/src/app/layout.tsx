import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import TopBar from "../components/TopBar";
import { Roboto_Mono } from 'next/font/google'
import SideBar from "../components/SideBar";


const robotoMono = Roboto_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-mono',
  style: ['normal', 'italic']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} antialiased grid grid-cols-[1fr_auto] grid-rows-[auto_1fr]`}
        >
          <TopBar />
          <SideBar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
