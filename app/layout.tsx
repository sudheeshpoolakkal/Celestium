import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./refined.css";
import "./cinematic.css";
import "./celestium.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Celestium · Beyond the horizon",
    template: "%s · Celestium",
  },
  applicationName: "Celestium",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Celestium",
    title: "Celestium · A new era of flight",
    description:
      "Explore a new era of vertical flight. Celestium connects aircraft concepts, mission systems and the MALUS hydrogen-electric research program.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celestium · A new era of flight",
    description: "Aircraft research. Mission-driven engineering. Possibilities beyond the runway.",
  },
  description:
    "Celestium explores the next era of vertical flight through aircraft concepts, mission systems, tiltrotor technology and the MALUS hydrogen-electric research program.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <noscript>
          <link rel="stylesheet" href="/noscript.css" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
