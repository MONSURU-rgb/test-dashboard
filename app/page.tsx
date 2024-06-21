import { TextInput } from "@mantine/core";
import { SearchNormal } from "iconsax-react";
import { LightDark } from "./components";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="px-6 py-1">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-between">
      <TextInput
        leftSection={<SearchNormal size="16" color="#A8A8A8" />}
        placeholder="Search..."
        classNames={{
          root: "w-1/3 py-3 rounded-xl px-6 bg-white flex",
          input: "!border-none outline-0",
          wrapper:
            "flex gap-2 items-center rounded-xl border border-primary-blue rounded-xl px-3",
        }}
        role="search"
      />

      <LightDark />
    </header>
  );
}
