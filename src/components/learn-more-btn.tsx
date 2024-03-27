"use client";

import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import { LuArrowDownRightFromCircle } from "react-icons/lu";

export default function LearnMoreBtn() {
  const [shimmerVisible, setShimmerVisible] = useState(false);

  setTimeout(() => {
    setShimmerVisible(true);
  }, 1000);

  return (
    <div className="-mt-48 xl:-mt-36">
      <Link
        href={"#learnMore"}
        className={clsx(
          "group -mt-48 inline-flex items-center justify-center rounded-lg border border-violet-800/35 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-3 text-lg font-medium tracking-tight text-violet-400 transition-all active:scale-95 sm:px-8 sm:text-xl hover:sm:scale-105 active:sm:scale-100",
          shimmerVisible && "animate-shimmer",
        )}
      >
        Learn More
        <LuArrowDownRightFromCircle className="ml-2 transition group-hover:translate-x-[3px] group-hover:translate-y-[2px] text-xl" />
      </Link>
    </div>
  );
}
