"use client";

import Link from "next/link";
import React, { memo } from "react";

import clsx from "clsx";
import { GiIceCube } from "react-icons/gi";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("./menu"));

function Navbar() {
  const pathName: string = usePathname();

  return (
    <nav
      className={clsx(
        "top-0 !z-50 mx-auto flex h-20 !w-full items-center justify-between px-6 sm:px-12",
        pathName !== "/" &&
          !pathName.startsWith("/sign-up") &&
          !pathName.startsWith("/sign-in")
          ? "safari-blur fixed border-b border-b-white/10 bg-slate-950/50"
          : "absolute",
      )}
    >
      <div>
        <Link
          href="/"
          className="flex gap-x-2 text-2xl font-semibold tracking-wide text-violet-400"
        >
          <GiIceCube className="text-3xl" />
          <span className="hidden sm:block">ColdMailer</span>
        </Link>
      </div>
      <div className="transition hover:scale-105 active:scale-100">
        {pathName !== "/" &&
          !pathName.startsWith("/sign-up") &&
          !pathName.startsWith("/sign-in") && <Menu></Menu>}
      </div>
    </nav>
  );
}

export default memo(Navbar);
