import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Roboto_Mono } from 'next/font/google'
import ClientApp from "@/components/ClientApp";


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
  title: "Rapid Guide",
  description: "Get your guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} antialiased`}>
            <Providers>
              <ClientApp>
                {children}
              </ClientApp>
            </Providers>
        </body>
      </html>
  );
}
