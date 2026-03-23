import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Serenity Resort — A Paradise Escape",
    template: "%s | Serenity Resort",
  },
  description:
    "Experience luxury and tranquility at Serenity Resort. Stunning ocean views, private villas, world-class spa, and unforgettable experiences await you.",
  keywords: [
    "luxury resort",
    "beach resort",
    "villa",
    "spa resort",
    "tropical getaway",
  ],
  openGraph: {
    title: "Serenity Resort — A Paradise Escape",
    description:
      "Experience luxury and tranquility at Serenity Resort. Stunning ocean views, private villas, and world-class amenities.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://serenityresort.com",
    siteName: "Serenity Resort",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Serenity Resort",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
