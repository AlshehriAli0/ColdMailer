"use client";

import React from "react";
import { LampDemo } from "@/ui/lamp";
import LearnMoreBtn from "./learn-more-btn";
import GetStartedButton from "./get-started-btn";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="flex flex-col items-center justify-center">
      <LampDemo />
      <motion.div
        className="flex gap-4 2xl:-mt-36 sm:gap-x-6 sm:mt-6 mt-2"
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{
          delay: 1.1,
          duration: 0.7,
          ease: "easeInOut",
        }}
      >
        <LearnMoreBtn />
        <GetStartedButton />
      </motion.div>
    </section>
  );
}
