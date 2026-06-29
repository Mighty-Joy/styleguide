import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/tokens/tokens.css";
import "./globals.css";
import Sidebar from "@/catalog/site/Sidebar";
import s from "@/catalog/site/DocSite.module.css";

const inter = Inter({ subsets: ["latin"], variable: "--sd-font-family" });

export const metadata: Metadata = {
  title: "Superdeal Design System",
  description:
    "The living catalog of Superdeal's UI — edit components here, mirror them into the app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* The left menu is part of the root shell, so it persists across every
            page (catalog, foundations, anything added later). */}
        <div className={s.shell}>
          <Sidebar />
          <main className={s.mainScroll}>{children}</main>
        </div>
      </body>
    </html>
  );
}
