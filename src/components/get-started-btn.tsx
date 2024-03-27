"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { MdStart } from "react-icons/md";

export default function GetStartedButton() {
  const [shimmerVisible, setShimmerVisible] = useState(false);
  const { isSignedIn } = useUser();
  const btnHref = isSignedIn ? "/tool" : "/sign-up";

  setTimeout(() => {
    setShimmerVisible(true);
  }, 1000);

  return (
    <div className="-mt-48 xl:-mt-36">
      <Link
        href={btnHref}
        className={clsx(
          "group -mt-48 inline-flex items-center justify-center rounded-lg border border-violet-800/35 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-3 text-lg font-medium tracking-tight text-violet-400 transition-all hover:sm:scale-105 active:scale-95 active:sm:scale-100 sm:px-8 sm:text-xl",
          shimmerVisible && "animate-shimmer",
        )}
      >
        Get Started
        <MdStart className="ml-2 text-2xl transition group-hover:translate-x-[6px]" />
      </Link>
    </div>
  );
}
