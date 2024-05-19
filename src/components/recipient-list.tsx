"use client";

import React, { useState, useEffect } from "react";
import { type Recipient } from "@/lib/types";
import { sortState } from "@/context/recoilContextProvider";
import { useRecoilValue } from "recoil";
import { sortRecipients } from "@/utils/helpers";
import { motion } from "framer-motion";

interface RecipientListProps {
  initialRecipients: Recipient[];
}

const fadeInVarient = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
      delay: 0.08 * index,
    },
  }),
};

export default function RecipientList({
  initialRecipients,
}: RecipientListProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
  const sortType = useRecoilValue(sortState);

  useEffect(() => {
    setRecipients(sortRecipients(initialRecipients, sortType));
  }, [sortType, initialRecipients]);

  return (
    <section id="recipients">
        {recipients.map((recipient, index) => (
          <motion.div
            variants={fadeInVarient}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
            custom={index}
            transition={{ ease: "easeIn" }}
            key={index}
            className="grid w-[95%] grid-cols-5 gap-4 border-b border-white/10 px-12 py-3 text-violet-200"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.1fr" }}
          >
            <p>{recipient.emailAddress}</p>
            <p>{recipient.name}</p>
            <p>{recipient.status}</p>
            <p>
              {typeof recipient.sentAt === "string"
                ? recipient.sentAt
                : new Date(recipient.sentAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
    </section>
  );
}
