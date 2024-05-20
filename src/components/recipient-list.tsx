"use client";

import React, { useState, useEffect, memo } from "react";
import { type Recipient } from "@/lib/types";
import {
  sortState,
  TotalAccepted,
  TotalEmails,
  TotalPending,
  TotalRejected,
} from "@/context/recoilContextProvider";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sortRecipients } from "@/utils/helpers";
import { motion } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import clsx from "clsx";

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
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
      delay: 0.08 * index,
    },
  }),
};

const RecipientList = memo(function RecipientList({
  initialRecipients,
}: RecipientListProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
  const [editingRecipient, setEditingRecipient] = useState<Recipient | null>(
    null,
  );
  const sortType = useRecoilValue(sortState);
  const setTotalEmails = useSetRecoilState(TotalEmails);
  const setTotalPending = useSetRecoilState(TotalPending);
  const setTotalAccepted = useSetRecoilState(TotalAccepted);
  const setTotalRejected = useSetRecoilState(TotalRejected);

  useEffect(() => {
    setRecipients(sortRecipients(initialRecipients, sortType));
  }, [sortType, initialRecipients]);

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
          className={clsx(
            "grid h-14 w-[95%] grid-cols-5 items-center justify-center gap-4 border-b border-white/10 px-12 text-violet-200 transition-all",
            editingRecipient === recipient ? "bg-white/[0.075]" : "",
          )}
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.3fr" }}
        >
          {editingRecipient === recipient ? (
            <EditRecipient
              recipient={recipient}
              setEditingRecipient={setEditingRecipient}
            />
          ) : (
            <React.Fragment>
              <p>{recipient.emailAddress}</p>
              <p>{recipient.name}</p>
              <p
                className={clsx(
                  recipient.status === "accepted" ? "text-green-500" : "",
                  recipient.status === "pending" ? "text-gray-400" : "",
                  recipient.status === "rejected" ? "text-red-500" : "",
                )}
              >
                {recipient.status}
              </p>
              <p>
                {typeof recipient.sentAt === "string"
                  ? recipient.sentAt
                  : new Date(recipient.sentAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => {
                  setEditingRecipient(recipient);
                }}
                className="flex items-center justify-center rounded text-violet-400 transition hover:bg-white/5 hover:text-violet-200 "
              >
                <span className="p-1 text-lg">
                  <BsThreeDots />
                </span>
              </button>
            </React.Fragment>
          )}
        </motion.div>
      ))}
    </section>
  );
});

export default RecipientList;
