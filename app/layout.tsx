"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  DirectInbox,
  FavoriteChart,
  Home3,
  ProfileCircle,
} from "iconsax-react";
import { BrandLogo } from "./components";

import { MantineProvider } from "@mantine/core";

import { useTheme } from "next-themes";
import { ThemeProvider } from "./components/shared/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Dashboard",
  description: "A dashboard showing sales information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grid grid-cols-[clamp(120px,16vw,300px)_1fr] dark:bg-black bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <MantineProvider>
            <SidebarLayout />
            <main>{children}</main>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function SidebarLayout() {
  return (
    <aside className="px-3 py-2 gap-3 flex flex-col justify-center">
      <BrandLogo />
      <ul className="text-primary-dark gap-2 grid">
        <li className="inline-flex gap-2 items-center px-4 py-3 bg-primary-blue rounded-lg">
          {" "}
          <Home3 size="20" />
          <span>Dashboard</span>
        </li>
        <li className="inline-flex gap-2 items-center px-4 py-3 bg-primary-blue rounded-lg">
          <ProfileCircle size="20" />
          <span>Profile</span>
        </li>
        <li className="inline-flex gap-2 items-center px-4 py-3 bg-primary-blue rounded-lg">
          <FavoriteChart size="20" />
          <span>Favorites</span>
        </li>
        <li className="inline-flex gap-2 items-center px-4 py-3 bg-primary-blue rounded-lg">
          <DirectInbox size="20" />
          <span>Inbox</span>
        </li>
      </ul>
    </aside>
  );
}
