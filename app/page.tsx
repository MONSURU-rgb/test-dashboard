"use client";

import { Avatar, TextInput } from "@mantine/core";
import { NotificationBing, SearchNormal } from "iconsax-react";
import { LightDark } from "./components";
import { useTheme } from "next-themes";

export default function Home() {
  return (
    <div className="px-6 py-1">
      <Header />
    </div>
  );
}

function Header() {
  const { theme } = useTheme();
  return (
    <header className="flex justify-between ">
      <TextInput
        leftSection={<SearchNormal size="16" color="#A8A8A8" />}
        placeholder="Search..."
        classNames={{
          root: "w-1/3 py-3 rounded-xl px-6 !bg-none flex",
          input: "!border-none outline-0 bg-none",
          wrapper:
            "flex gap-2 items-center rounded-xl border border-primary-blue rounded-xl px-3 ",
        }}
        role="search"
      />
      <section className="flex gap-2 items-center">
        <LightDark />
        <NotificationBing color={"#4880FF"} />
        <Avatar src="/course-instructor-1.svg" alt="it's me" className="w-6" />
      </section>
    </header>
  );
}
