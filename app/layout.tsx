import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
      <body className="min-h-screen overflow-x-hidden text-foreground bg-[url('/darkBG.jpg')] bg-cover bg-center bg-no-repeat h-screen w-full">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}