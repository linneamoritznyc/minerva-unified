import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minerva Autopilot",
  description: "Your AI executive assistant for university recruitment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
