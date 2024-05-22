"use client";
import { editRecipient } from "@/context/recoilContextProvider";
import { type Recipient } from "@/lib/types";
import updateRecipient from "@/server/updated-recipient";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface EditRecipientProps {
  initialPosition: { x: number; y: number };
}

export default function EditRecipient({ initialPosition }: EditRecipientProps) {
  const [editedRecipient, setEditedRecipient] = useRecoilState(editRecipient);
  const [originalRecipient, setOriginalRecipient] = useState<Recipient | null>(
    null,
  );
  const [change, setChange] = useState(false);
  useEffect(() => {
    if (editedRecipient && !originalRecipient) {
      setOriginalRecipient({ ...editedRecipient });
    }
  }, [editedRecipient, originalRecipient]);

  const handleCancel = () => {
    setEditedRecipient(null);
  };

  const sentAtDate =
    editedRecipient?.sentAt instanceof Date
      ? editedRecipient.sentAt
      : editedRecipient?.sentAt
        ? new Date(editedRecipient.sentAt)
        : null;

  if (!editedRecipient) {
    return null;
  }

  const screenHeight = window.innerHeight;
  const isAbove = initialPosition.y < screenHeight / 2;

  const animationVariants = {
    initial: {
      opacity: 0,
      x: initialPosition.x * 0.1,
      y: isAbove ? initialPosition.y * -0.2 : initialPosition.y * 0.2,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8 },
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: { duration: 0.5 },
      scale: 0.8,
    },
  };

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!change) {
      toast.info("No changes were made", {
        className: "bg-slate-900/95 text-violet-100 text-base border-white/10",
      });
      return;
    }

    if (!originalRecipient) return;
    const formData = new FormData(e.currentTarget);

    await updateRecipient(originalRecipient, formData);
  };

  return (
    <AnimatePresence>
      {editedRecipient && (
        <div className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-lg">
          <motion.form
            key="edit-recipient-form"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 left-[5%] top-[50%] z-[99] grid h-14 w-[90%] items-center gap-4 rounded border border-white/5 bg-white/[0.08] px-12 shadow-2xl"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.3fr" }}
            onSubmit={(e) => formAction(e)}
          >
            <input
              className="h-[65%] rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
              type="email"
              name="emailAddress"
              defaultValue={editedRecipient.emailAddress}
              onChange={() => {
                if (!change) {
                  setChange(true);
                }
              }}
              required
            />

            <input
              className="rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
              type="text"
              name="name"
              onChange={() => {
                if (!change) {
                  setChange(true);
                }
              }}
              defaultValue={editedRecipient.name}
            />

            <select
              className="rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
              name="status"
              defaultValue={editedRecipient.status}
              onChange={() => {
                if (!change) {
                  setChange(true);
                }
              }}
              required
            >
              <option
                className="p-2 font-bold text-violet-800"
                value="accepted"
              >
                accepted
              </option>
              <option className="p-2 font-bold text-violet-800" value="pending">
                pending
              </option>
              <option
                className="p-2 font-bold text-violet-800"
                value="rejected"
              >
                rejected
              </option>
            </select>

            <div className="flex items-center gap-2">
              <input
                className="rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
                type="date"
                name="sentAt"
                defaultValue={sentAtDate?.toISOString().split("T")[0] ?? ""}
                onChange={() => {
                  if (!change) {
                    setChange(true);
                  }
                }}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                className="rounded p-1 text-2xl text-violet-200 transition hover:bg-white/5"
              >
                <IoMdSave />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded p-1 text-2xl text-violet-200 transition hover:bg-white/5"
              >
                <MdOutlineCancel />
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}
