import Link from 'next/link';
import React from 'react'

export default function GetStartedButton() {
  return (
    <Link
      href="/tool"
      className="animate-shimmer inline-flex items-center justify-center rounded-md border border-violet-800/35 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-2 font-semibold text-violet-400 transition-all hover:scale-105 active:scale-100  "
    >
      Get started
    </Link>
  );
}
