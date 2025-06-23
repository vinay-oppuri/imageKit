import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Authentication Test - App.",
  description: "Developed for Authentication Tesing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Navbar />
          {children}
        </Providers>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a202c",
              color: "#fefefe",
              fontSize: "14px",
              borderRadius: "8px",
              padding: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}