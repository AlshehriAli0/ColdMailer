"use client";

import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";
import { GiIceCube } from "react-icons/gi";
import { useUser } from "@clerk/nextjs";
import GetStartedButton from "./get-started-button";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="absolute top-0 flex h-16 w-full items-center justify-between px-6 ">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
      >
        <Link
          href="/"
          className="flex gap-x-2 text-2xl font-semibold tracking-wide text-violet-400"
        >
          <GiIceCube className="text-3xl" />
          ColdMailer
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="transition hover:scale-105 active:scale-100"
      >
        
        {{isSignedIn} && <GetStartedButton></GetStartedButton>}
      </motion.div>
    </nav>
  );
}
