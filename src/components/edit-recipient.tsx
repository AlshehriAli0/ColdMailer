import { editRecipient } from "@/context/recoilContextProvider";
import type { Recipient } from "@/lib/types";
import updateRecipient from "@/server/updated-recipient";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export default function EditRecipient() {
  const [editedRecipient, setEditedRecipient] = useRecoilState(editRecipient);
  const [originalRecipient, setOriginalRecipient] = useState<Recipient | null>(
    null,
  );
  const [change, setChange] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (editedRecipient && !originalRecipient) {
      setOriginalRecipient({ ...editedRecipient });
    }
  }, [editedRecipient, originalRecipient]);

  const handleCancel = () => {
    setCancel(true);
    setTimeout(() => {
      setEditedRecipient(null);
    }, 100);
  };

  const sentAtDate =
    editedRecipient?.sent_at instanceof Date
      ? editedRecipient.sent_at
      : editedRecipient?.sent_at
        ? new Date(editedRecipient.sent_at)
        : null;

  if (!editedRecipient) {
    return null;
  }

  const animationVariants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.9,
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 250,
        damping: 20,
        mass: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 100,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
        mass: 0.3,
      },
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
    handleCancel();

    const resPromise = new Promise((resolve, reject) => {
      updateRecipient(originalRecipient, formData)
        .then((res) => {
          resolve(res);
          if (!res) throw new Error();
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(resPromise, {
      loading: "Updating Recipient",
      success: "Recipient Updated",
      error: "Too many requests, please try again later",
      className: "bg-slate-900/95 text-violet-100 text-base border-white/10",
    });
  };

  return (
    <AnimatePresence mode="wait">
      {editedRecipient && !cancel && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            key="form"
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
              defaultValue={editedRecipient.email_address}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
