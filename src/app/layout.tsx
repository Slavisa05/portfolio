import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { GoogleAnalytics } from '@next/third-parties/google'
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Slaviša Arsenijević — Web Developer | Next.js & Django",
  description: "Izrada web sajtova i aplikacija za male biznise u Srbiji. Next.js, Django, PostgreSQL — od ideje do deploya. Odgovaram u roku od 24h.",

  openGraph: {
    title: "Slaviša Arsenijević — Full Stack Web Developer",
    description: "Pravim web sajtove i aplikacije za male biznise u Srbiji. Od ideje do deploya.",
    url: "https://slavisadev.com",
    siteName: "slavisadev.com",
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: "https://slavisadev.com/slavisadev.png",
        width: 1200,
        height: 630,
        alt: "Slaviša Arsenijević — Full Stack Web Developer",
      },
    ],
  },

  // Twitter/X kartice
  twitter: {
    card: "summary_large_image",
    title: "Slaviša Arsenijević — Full Stack Web Developer",
    description: "Pravim web sajtove i aplikacije za male biznise u Srbiji.",
    images: ["https://slavisadev.com/slavisadev.png"],
  },

  // Canonical URL (sprijecava duplicate content)
  alternates: {
    canonical: "https://slavisadev.com",
  },

  // Ikonica u tabu browsera
  icons: {
    icon: "/favicon.ico",
  },

  // Dozvoljava Googleu da indeksira
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>

      <GoogleAnalytics gaId="G-2DQFYEV6ME" />
    </html>
  );
}
