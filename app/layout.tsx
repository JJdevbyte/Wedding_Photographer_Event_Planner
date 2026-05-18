import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURELIA | Luxury Wedding Photographer & Event Planner",
  description: "Bespoke visual storytelling and cinematic event orchestration. High-end, editorial wedding photography and design services for extraordinary couples worldwide.",
  keywords: [
    "Luxury Wedding Photographer",
    "High-End Event Planner",
    "Editorial Wedding Photography",
    "Fine Art Wedding Gallery",
    "Bespoke Event Design",
    "Amalfi Coast Wedding Photographer",
    "Napa Valley Event Coordinator"
  ],
  authors: [{ name: "Aurelia Vane" }],
  openGraph: {
    title: "AURELIA | Luxury Wedding Photographer & Event Planner",
    description: "Bespoke visual storytelling and cinematic event orchestration.",
    type: "website",
  },
  other: {
    "darkreader-lock": "true",
    darkreader: "NO-DARKREADER-PLUGIN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
