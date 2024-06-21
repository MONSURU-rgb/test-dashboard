"use client";

import React from "react";
import { Moon, Sun } from "iconsax-react";
import { useTheme } from "next-themes";

export function LightDark() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="px-2 h-fit py-2 text-white dark:text-black bg-white dark:bg-black font-semibold rounded-md light-dark"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}>
      {theme === "light" ? (
        <Moon size="20" color="#FF8A65" />
      ) : (
        <Sun size="20" color="#FF8A65" />
      )}
    </button>
  );
}
