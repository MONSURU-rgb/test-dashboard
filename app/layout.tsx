"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  DirectInbox,
  FavoriteChart,
  Home3,
  LogoutCurve,
  ProfileCircle,
  Setting2,
} from "iconsax-react";
import { BrandLogo } from "./components";

import { MantineProvider, createTheme } from "@mantine/core";

import { useTheme } from "next-themes";
import { ThemeProvider } from "./components/shared/theme-provider";
import clsx from "clsx";

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
      <body className="grid grid-cols-[200px_1fr] bg-[#f9f9f993] dark:bg-[#113264] min-h-screen">
        <MantineProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <SidebarLayout />
            <main className="w-full overflow-auto">{children}</main>
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

function SidebarLayout() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <aside className="flex flex-col max-h-screen py-4 bg-slate-300 dark:bg-slate-950">
      <section className="px-3 gap-3 flex flex-col flex-1">
        <BrandLogo />
        <ul
          className={clsx(
            "gap-2 flex flex-col",
            theme === "dark" ? "text-primary-dark" : "text-white"
          )}>
          <li
            className={clsx(
              "inline-flex gap-2 items-center px-4 py-3 bg-primary-blue rounded-lg"
            )}>
            {" "}
            <Home3 size="20" />
            <span>Dashboard</span>
          </li>
          <li className="aside-style">
            <ProfileCircle size="20" />
            <span>Profile</span>
          </li>
          <li className="aside-style">
            <FavoriteChart size="20" />
            <span>Favorites</span>
          </li>
          <li className="aside-style">
            <DirectInbox size="20" />
            <span>Inbox</span>
          </li>
        </ul>
      </section>

      <ul
        className={clsx(
          "gap-2 grid",
          theme === "dark" ? "text-primary-dark px-3" : "text-white px-3"
        )}>
        <li className="aside-style">
          <Setting2 size="20" />
          <span>Settings</span>
        </li>
        <li className="aside-style">
          <LogoutCurve size="20" />
          <span>Log out</span>
        </li>
      </ul>
    </aside>
  );
}
