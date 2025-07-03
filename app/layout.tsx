import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar"
import Providers from "@/components/providers";
import SplineEmbed from "@/components/spline";

export const metadata: Metadata = {
  title: "Clipo - Discover & Share Videos",
  description: "Explore and share amazing videos from creators around the world on VidShare.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Providers>
          <SplineEmbed/>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}