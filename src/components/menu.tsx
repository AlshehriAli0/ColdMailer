"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { RiMenu3Line } from "react-icons/ri";

import clsx from "clsx";
import MenuLinks from "./menu-links";

export default function Menu() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <aside className="z-40">
      <Drawer
        styles={{
          header: {
            backgroundColor: "rgb(2 6 23 / 0)",
            color: "rgb(255 255 255)",
            display: "none",
          },
          content: {
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
            backgroundColor: "rgb(2 6 23 / 0)",
            borderLeft: "1px solid rgb(255 255 255 / 0.07)",
          },
          inner: {
            marginTop: "80px",
            zIndex: 40,
          },
        }}
        withCloseButton={false}
        position="top"
        withOverlay={false}
        radius="md"
        size={1000}
        opened={opened}
        onClose={close}
        title="Control Panel"
      >
        <MenuLinks closeMenu={close} />
      </Drawer>

      <button
        onClick={opened ? close : open}
        className={clsx(
          "group items-center justify-center rounded-md border-b-2 border-violet-900 px-4 py-3 text-xl font-medium tracking-tight text-violet-400 transition-all active:scale-95 md:px-3 md:py-2 md:hover:bg-violet-900/10 ",
          opened ? "scale-105 bg-violet-900/10" : "",
        )}
      >
        <RiMenu3Line
          className={clsx(
            "transition-all group-hover:scale-110 sm:text-2xl ",
            opened ? " md:scale-110" : "",
          )}
        />
      </button>
    </aside>
  );
}
