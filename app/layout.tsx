import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"]
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "MINITO.VFX — I Edit Attention.",
  description:
    "Short-form & long-form video editing for creators, brands and businesses who want to stand out.",
  metadataBase: new URL("https://minitovfx.example.com"),
  openGraph: {
    title: "MINITO.VFX — I Edit Attention.",
    description:
      "Short-form & long-form video editing for creators, brands and businesses who want to stand out.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-paper font-body antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
