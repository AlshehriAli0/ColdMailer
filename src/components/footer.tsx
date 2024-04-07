import React from "react";

export default function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <footer className="mb-4 px-4 text-center text-violet-500/40">
      <small className="mb-2 text-xs font-semibold">
        &copy; {year} ColdMailer By Ali Alshehri. All rights reserved.
      </small>
      <div className="text-xs">
        <span className="font-semibold">About this website: </span>A modern mail sending tool, built using
        Next.js, TypeScript, tRPC, Prisma & PostgreSQL, Tailwind CSS, FastApi for Backend and deployed through Vercel.
      </div>
    </footer>
  );
}
