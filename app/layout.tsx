import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NineJan - Social Media App",
  description: "A modern social media platform",
  icons: {
    icon: '/NineJan logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/NineJan logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

