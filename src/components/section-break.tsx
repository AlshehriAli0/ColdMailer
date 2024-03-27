"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionBreak() {
  return (
    <motion.div
      className="my-16 h-20 w-1 rounded-full bg-violet-200/10 sm:my-24 "
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{ delay: 0.17 }}
    ></motion.div>
  );
}
