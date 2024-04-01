"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";

export default function Menu() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <aside className="z-50">
      <Drawer
        styles={{
          header: {
            backgroundColor: "rgb(2 6 23 / 0)",
            color: "rgb(255 255 255)",
          },
          content: {
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            backgroundColor: "rgb(2 6 23 / 0)",
            borderLeft: "1px solid rgb(255 255 255 / 0.07)",
          },
          inner: {
            marginTop: "65px",
          },
        }}
        withCloseButton={false}
        position="top"
        withOverlay={false}
        radius="md"
        size={10000}
        opened={opened}
        onClose={close}
        title="Control Panel"
      >
        <Link
          href={"/profile"}
          className="h-full w-full border-t-2 border-white/5"
        >
          Profile
        </Link>
        <button className="h-12 w-full border-t-2 border-white/5"> </button>
        <button className="h-12 w-full border-t-2 border-white/5"></button>
        <button className="h-12 w-full border-t-2 border-white/5"></button>
      </Drawer>

      <button
        onClick={opened ? close : open}
        className={
          "group items-center justify-center rounded-md border-b-2 border-violet-900 px-4 py-3 text-xl font-medium tracking-tight text-violet-400 transition-all hover:bg-violet-900/10 active:scale-95 md:active:scale-100"
        }
      >
        <RiMenu3Line className="transition group-hover:scale-110 sm:text-2xl" />
      </button>
    </aside>
  );
}
