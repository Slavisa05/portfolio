import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
});

const description =
  "Izrada sajtova i online prodavnica za male biznise — Ub, Beograd i cela Srbija. Dizajn po meri, hosting i održavanje. Sajt od 250 €, besplatna ponuda, odgovor u roku od 24h.";

export const metadata: Metadata = {
  metadataBase: new URL("https://slavisadev.com"),
  title: {
    default: "Izrada sajtova za male biznise | Slaviša Arsenijević — slavisadev",
    template: "%s | slavisadev",
  },
  description,

  openGraph: {
    title: "Izrada sajtova za male biznise — slavisadev",
    description,
    url: "/",
    siteName: "slavisadev.com",
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: "/slavisadev.png",
        width: 1200,
        height: 630,
        alt: "slavisadev — izrada sajtova za male biznise",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Izrada sajtova za male biznise — slavisadev",
    description,
    images: ["/slavisadev.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

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
      lang="sr-Latn" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
