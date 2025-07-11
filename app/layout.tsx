import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar"
import Providers from "@/components/providers";

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
      <body className="min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-[url('/lightBG.jpg')] dark:bg-[url('/bg-dark.jpg')]"/>

        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}