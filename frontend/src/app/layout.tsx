import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "WorkForce AI — Replace Overhead. Deploy Intelligence.",
  description:
    "Pre-built AI agents that embed directly into your enterprise operations. No IT team required. Live in 24 hours. Africa's leading AI workforce platform.",
  openGraph: {
    title: "WorkForce AI — Replace Overhead. Deploy Intelligence.",
    description:
      "Pre-built AI agents that replace operational roles — HR, Finance, Customer Ops, and Compliance — deployed in 24 hours without a developer.",
    type: "website",
  },
};

import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
