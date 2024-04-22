"use client";

import React from "react";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Footer() {
  const pathName: string = usePathname();
  const year: number = new Date().getFullYear();
  return (
    <footer
      className={clsx(
        "mb-4 px-4 text-center text-violet-500/40",
        pathName.startsWith("/dashboard") ? "hidden" : null,
      )}
    >
      <small className="mb-2 text-xs font-semibold">
        &copy; {year} ColdMailer By Ali Alshehri. All rights reserved.
      </small>
      <div className="text-xs">
        <span className="font-semibold">About this website: </span>A modern mail
        sending tool, built using Next.js, TypeScript, Prisma & PostgreSQL,
        Tailwind CSS, FastApi for Backend and deployed through Vercel.
      </div>
    </footer>
  );
}
