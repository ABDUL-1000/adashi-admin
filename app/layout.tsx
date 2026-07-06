import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AdminProviders } from "@/components/admin/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adashi Admin",
  description: "Adashi admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AdminProviders>{children}</AdminProviders>
        <Toaster />
      </body>
    </html>
  );
}
