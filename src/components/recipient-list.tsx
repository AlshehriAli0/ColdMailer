"use client";

import React, { useState, useEffect } from "react";
import type { Recipient } from "@/lib/types";
import {
  editRecipient,
  sortState,
  TotalAccepted,
  TotalEmails,
  TotalPending,
  TotalRejected,
} from "@/context/recoilContextProvider";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sortRecipients } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import RecipientRow from "@/components/recipient-row";

const EditRecipient = React.lazy(() => import("@/components/edit-recipient"));

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
      delay: 0.15 * index,
      duration: 0.15,
      type: "spring",
    },
  }),
};

export default function RecipientList({
  initialRecipients,
}: RecipientListProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
  const [editingRecipient, setEditingRecipient] =
    useRecoilState<Recipient | null>(editRecipient);
  const sortType = useRecoilValue(sortState);
  const setTotalEmails = useSetRecoilState(TotalEmails);
  const setTotalPending = useSetRecoilState(TotalPending);
  const setTotalAccepted = useSetRecoilState(TotalAccepted);
  const setTotalRejected = useSetRecoilState(TotalRejected);

  useEffect(() => {
    setRecipients(sortRecipients(initialRecipients, sortType));
  }, [sortType, initialRecipients]);

  useEffect(() => {
    const totalEmails = recipients.length;
    const totalPending = recipients.filter(
      (r) => r.status === "pending",
    ).length;
    const totalAccepted = recipients.filter(
      (r) => r.status === "accepted",
    ).length;
    const totalRejected = recipients.filter(
      (r) => r.status === "rejected",
    ).length;

    setTotalEmails(totalEmails);
    setTotalPending(totalPending);
    setTotalAccepted(totalAccepted);
    setTotalRejected(totalRejected);
  }, [
    recipients,
    setTotalEmails,
    setTotalPending,
    setTotalAccepted,
    setTotalRejected,
  ]);

  const handleEditClick = (recipient: Recipient) => {
    setEditingRecipient(recipient);
  };

  return (
    <section id="recipients" className="mb-8">
      <AnimatePresence mode="wait">
        {recipients.map((recipient, index) => (
          <motion.div
            variants={fadeInVarient}
            initial="initial"
            animate="animate"
            custom={index}
            key={index}
            className={clsx(
              "h-14 max-w-full border-b border-white/10 px-2 text-violet-200 transition-all md:w-[95%] md:px-12",
            )}
          >
            {editingRecipient === recipient ? (
              <EditRecipient key="edit-recipient" />
            ) : (
              <motion.div
                className="grid h-full grid-cols-5 gap-4 text-center"
                style={{ gridTemplateColumns: "4fr 4fr 1fr 1fr 0.3fr" }}
              >
                <RecipientRow
                  recipient={recipient}
                  handleEditClick={handleEditClick}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
