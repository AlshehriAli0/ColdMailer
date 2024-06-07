"use client";

import React, { memo } from "react";
import clsx from "clsx";

import { FaChartBar } from "react-icons/fa6";
import { FaKey, FaBook } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar() {
  const pathName: string = usePathname();

  return (
    <nav className="fixed top-[5rem] flex w-full shrink-0 flex-col border-b-2 border-b-violet-200/10 bg-slate-950 md:top-32 md:!z-40 md:w-[240px] md:border-0">
      <div className="flex flex-row justify-between gap-x-4 gap-y-2 p-4 px-5 py-3 text-center sm:p-5 md:flex-col md:py-0 md:text-left">
        <Link
          href="/dashboard/tracker"
          className={clsx(
            "focus-visible:ring-ring bg-muted flex h-max w-[25%] flex-col items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-violet-400/80 transition-colors hover:bg-white/[0.08] hover:text-violet-300 focus-visible:outline-none focus-visible:ring-1 active:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-50 sm:ml-6 sm:h-10 sm:flex-row sm:justify-start sm:px-4 sm:text-base md:w-full",
            pathName === "/dashboard/tracker"
              ? "bg-white/[0.08] !text-violet-300"
              : null,
          )}
        >
          <FaChartBar /> <span>Tracker</span>
        </Link>
        <Link
          href="/dashboard/passkeys"
          className={clsx(
            "focus-visible:ring-ring bg-muted flex h-max w-[25%] flex-col items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-violet-400/80 transition-colors hover:bg-white/[0.08] hover:text-violet-300 focus-visible:outline-none focus-visible:ring-1 active:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-50 sm:ml-6 sm:h-10 sm:flex-row sm:justify-start sm:px-4 sm:text-base md:w-full",
            pathName === "/dashboard/passkeys"
              ? "bg-white/[0.08] !text-violet-300"
              : null,
          )}
        >
          <FaKey /> <span>Passkeys</span>
        </Link>
        <Link
          href="/dashboard/learn-how"
          className={clsx(
            "focus-visible:ring-ring bg-muted flex h-max w-[25%] flex-col items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-violet-400/80 transition-colors hover:bg-white/[0.08] hover:text-violet-300 focus-visible:outline-none focus-visible:ring-1 active:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-50 sm:ml-6 sm:h-10 sm:flex-row sm:justify-start sm:px-4 sm:text-base md:w-full",
            pathName === "/dashboard/learn-how"
              ? "bg-white/[0.08] !text-violet-300"
              : null,
          )}
        >
          <FaBook /> <span>Learn How</span>
        </Link>
      </div>
    </nav>
  );
}

export default memo(SideBar);
