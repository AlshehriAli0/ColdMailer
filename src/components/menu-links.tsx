"use client";

import React from "react";
import { linkData } from "@/lib/data";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { SiMinutemailer } from "react-icons/si";
import { MdOutlineDashboardCustomize, MdLogout } from "react-icons/md";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const linksIcons = {
  Profile: <CgProfile />,
  Tool: <SiMinutemailer />,
  Dashboard: <MdOutlineDashboardCustomize />,
  Logout: <MdLogout />,
};

export default function MenuLinks() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLinkClick = async (linkName: string) => {
    if (linkName === "Logout") {
      await signOut(() => router.push("/"));
    }
  };

  return (
    <div className="mt-5 flex w-full flex-col items-center md:mt-2 ">
      {linkData.map((link, index: number) => (
        <ul
          key={index}
          className="flex h-16 w-[95%] items-center justify-center border-b-2 border-white/5 md:w-[90%] "
        >
          <Link
            href={link.href}
            onClick={() => handleLinkClick(link.name)}
            className=" flex h-[95%] w-[90%] items-center justify-center gap-x-2 rounded-lg text-xl font-semibold tracking-tight text-violet-300 transition-all hover:scale-110 hover:bg-white/5 active:scale-100 md:ml-2 md:w-96"
          >
            {link.name}

            {linksIcons[link.name] ? (
              <span className=" ">{linksIcons[link.name]}</span>
            ) : null}
          </Link>
        </ul>
      ))}
    </div>
  );
}
