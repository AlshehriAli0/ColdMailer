"use client";

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import clsx from "clsx";

export default function Menu() {
  const [opened, { open, close }] = useDisclosure(false);
  const [shimmerVisible, setShimmerVisible] = useState(false);

  setTimeout(() => {
    setShimmerVisible(true);
  }, 1000);

  return (
    <React.Fragment>
      <Drawer
        position="right"
        offset={8}
        size={320}
        radius="sm"
        opened={opened}
        onClose={close}
        title="Authentication"
      ></Drawer>

      <button
        onClick={open}
        className={clsx(
          " items-center justify-center rounded-md border border-violet-800/35 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 py-3 text-xl font-medium tracking-tight text-violet-400 transition-all hover:scale-105 active:scale-100",
          shimmerVisible && "animate-shimmer",
        )}
      >
        Open Drawer
      </button>
    </React.Fragment>
  );
}
