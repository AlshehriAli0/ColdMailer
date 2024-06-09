"use client";

import React, { useState, useEffect } from "react";
import type { Recipient } from "@/lib/types";
import { editRecipient, sortState } from "@/context/recoilContextProvider";
import { useRecoilState, useRecoilValue } from "recoil";
import { sortRecipients } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import RecipientRow from "@/components/recipient-row";

const EditRecipient = React.lazy(() => import("@/components/edit-recipient"));

type RecipientListProps = {
  initialRecipients: Recipient[];
};



export default function RecipientList({
  initialRecipients,
}: RecipientListProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
  const [editingRecipient, setEditingRecipient] =
    useRecoilState<Recipient | null>(editRecipient);
  const sortType = useRecoilValue(sortState);

  useEffect(() => {
    setRecipients(sortRecipients(initialRecipients, sortType));
  }, [sortType, initialRecipients]);

  const handleEditClick = (recipient: Recipient) => {
    setEditingRecipient(recipient);
  };

  return (
    <section id="recipients" className="mb-8">
        {recipients.map((recipient, index) => (
          <div
            key={index}
            className={clsx(
              "h-14 max-w-full border-b border-white/10 px-2 text-violet-200 transition-all md:w-[95%] md:px-12",
            )}
          >
            {editingRecipient === recipient ? (
              <EditRecipient key="edit-recipient" />
            ) : null}
            <motion.div
              onClick={() => handleEditClick(recipient)}
              className="grid h-full grid-cols-5 gap-4 text-center rounded-lg md:hover:bg-white-5 md:pointer-events-none"
              style={{ gridTemplateColumns: "4fr 4fr 1fr 1fr 0.3fr" }}
            >
              <RecipientRow
                recipient={recipient}
                handleEditClick={handleEditClick}
              />
            </motion.div>
          </div>
        ))}
    </section>
  );
}
