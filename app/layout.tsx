
import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
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
