"use client";

import Link from "next/link";
import React from "react";

import clsx from "clsx";
import { motion } from "framer-motion";
import { GiIceCube } from "react-icons/gi";
import { usePathname } from "next/navigation";
import Menu from "./menu";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav
      className={clsx(
        " top-0 z-50 mx-auto flex h-20 w-screen items-center justify-between px-6 md:h-16 ",
        pathName !== "/"
          ? "safari-blur fixed border-b border-b-white/5 bg-slate-950/50"
          : "absolute ",
      )}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
      >
        <Link
          href="/"
          className="flex gap-x-2 text-2xl font-semibold tracking-wide text-violet-400"
        >
          <GiIceCube className="text-3xl" />
          <span className="hidden sm:block">ColdMailer</span>
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35 }}
        className="transition hover:scale-105 active:scale-100"
      >
        {pathName === "/tool" && <Menu></Menu>}
      </motion.div>
    </nav>
  );
}
