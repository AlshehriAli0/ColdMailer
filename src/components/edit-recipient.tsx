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
    }, 150);
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

    const updateObj = {
      id: originalRecipient.id,
      emailAddress: formData.get("emailAddress") as string,
      name: formData.get("name") as string,
      status: formData.get("status") as "accepted" | "pending" | "rejected",
      sentAt: formData.get("sentAt") as string,
    };

    const updatePromise = updateRecipient(updateObj).then((response) => {
      if (response[1]) {
        throw new Error(response[1].message);
      }
      return response;
    });

    toast.promise(updatePromise, {
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
          className="safari-blur fixed inset-0 z-50 h-screen w-screen backdrop-blur-lg"
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
            className="absolute inset-0 z-[99] mx-8 my-auto flex h-[45%] flex-col items-center justify-center gap-4 gap-x-9 gap-y-4 rounded border border-white/5 bg-white/[0.08] px-12 shadow-2xl md:left-[5%] md:top-[50%] md:mx-0 md:my-0 md:grid md:h-14 md:w-[90%]"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.3fr" }}
            onSubmit={(e) => formAction(e)}
          >
            <input
              className="h-[15%] w-[80%] rounded border-2 border-white/5 bg-transparent p-1 outline-none transition-all focus:border-none focus:outline-violet-200 md:h-[65%] md:w-full "
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
              className="h-[15%] w-[80%] rounded border-2 border-white/5 bg-transparent p-1 outline-none transition-all focus:border-none focus:outline-violet-200 md:h-[65%] md:w-full"
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
              className="h-[15%] w-[80%] rounded border-2 border-white/5 bg-transparent p-1 outline-none transition-all focus:border-none focus:outline-violet-200 md:h-[65%] md:w-full"
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
                className="w-[100%] rounded border-2 border-white/5 bg-transparent p-1 outline-none transition-all focus:border-none focus:outline-violet-200 md:h-[65%]"
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
                className="group rounded border-2 border-white/5 px-5 py-2 text-2xl text-violet-200 transition hover:bg-white/5 active:scale-90 md:p-1"
              >
                <div className="transition-all active:scale-100 group-hover:scale-[1.17]">
                  <IoMdSave />
                </div>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="group rounded border-2 border-white/5 px-5 py-2 text-2xl text-violet-200 transition hover:bg-white/5 active:scale-90 md:p-1"
              >
                <div className="transition-all active:scale-100 group-hover:scale-[1.17]">
                  <MdOutlineCancel />
                </div>
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
