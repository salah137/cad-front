
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title:"cad",
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head ></head>

      <body >
        {children}

      </body>
    </html>
  );
}
