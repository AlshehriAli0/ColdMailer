import { editRecipient } from "@/context/recoilContextProvider";
import type { Recipient } from "@/lib/types";
import updateRecipient from "@/server/updated-recipient";
import React, { useEffect, useState } from "react";
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
    }, 200);
  };

  const sentAtDate =
    typeof editedRecipient?.sent_at === "string"
      ? editedRecipient.sent_at
      : editedRecipient?.sent_at
        ? new Date(editedRecipient.sent_at).toLocaleDateString()
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
      email_address: formData.get("emailAddress") as string,
      name: formData.get("name") as string,
      status: formData.get("status") as "accepted" | "pending" | "rejected",
      sentAt: formData.get("sentAt") as string,
      note: formData.get("note") as string,
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
            className="absolute inset-0 z-[99] mx-auto my-auto flex h-[75%] w-[90%] flex-col rounded-lg border border-white/10 bg-slate-950/90 p-6 px-8 shadow-2xl md:w-[38rem]"
            onSubmit={(e) => formAction(e)}
          >
            <div className="mb-12 w-full">
              <h1 className="text-2xl font-bold">Edit Recipient</h1>
              <p className="text-violet-500/50">
                Make changes to the recipient details.
              </p>
            </div>

            <div className="mb-6 flex justify-center gap-3 md:gap-6">
              <section className="group w-full">
                <h2 className="mb-2 text-sm text-violet-400/60 transition-all group-focus-within:text-violet-400">
                  Email *
                </h2>
                <input
                  className="w-full rounded-md border-[1px] border-violet-300/40 bg-transparent p-2 outline-none transition-all focus:border-violet-400"
                  placeholder="Enter email"
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
              </section>
              <section className="group w-full">
                <h2 className="mb-2 w-full text-sm text-violet-400/60 transition-all group-focus-within:text-violet-400">
                  Name
                </h2>
                <input
                  className="group w-full rounded-md border-[1px] border-violet-300/40 bg-transparent p-2 outline-none transition-all focus:border-violet-400"
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  onChange={() => {
                    if (!change) {
                      setChange(true);
                    }
                  }}
                  defaultValue={editedRecipient.name}
                />
              </section>
            </div>

            <div className="mb-6 flex justify-center gap-3 md:gap-6">
              <section className="group w-full">
                <h2 className="mb-2 w-full text-sm text-violet-400/60 transition-all group-focus-within:text-violet-400">
                  Status *
                </h2>
                <select
                  className="w-full rounded-md border-[1px] border-violet-300/40 bg-transparent p-2 py-3 outline-none transition-all focus:border-violet-400"
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
                  <option
                    className="p-2 font-bold text-violet-800"
                    value="pending"
                  >
                    pending
                  </option>
                  <option
                    className="p-2 font-bold text-violet-800"
                    value="rejected"
                  >
                    rejected
                  </option>
                </select>
              </section>

              <section className="group w-full">
                <h2 className="mb-2 w-full text-sm text-violet-400/60 group-focus-within:text-violet-400">
                  Sent At *
                </h2>
                <input
                  className="w-full rounded-md border-[1px] border-violet-300/40 bg-transparent p-2 px-2 outline-none transition-all focus:border-violet-400"
                  type="date"
                  placeholder="Enter date"
                  name="sentAt"
                  defaultValue={sentAtDate ? sentAtDate : ""}
                  onChange={() => {
                    if (!change) {
                      setChange(true);
                    }
                  }}
                  required
                />
              </section>
            </div>

            <div className="group h-[30%]">
              <h2 className="mb-2 text-sm text-violet-400/60 transition-all group-focus-within:text-violet-400">
                Notes
              </h2>
              <textarea
                className="group h-[67%] w-full rounded-md border-[1px] border-violet-300/40 bg-transparent p-2 outline-none transition-all focus:border-violet-400"
                defaultValue={editedRecipient?.note}
                name="note"
                placeholder="Enter notes"
                onChange={() => {
                  if (!change) {
                    setChange(true);
                  }
                }}
              />
            </div>

            <div className="mt-12 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border-2 border-white/10 px-5 py-2 text-2xl text-white/80 transition-all hover:scale-[1.05] hover:bg-white/10 active:scale-100 md:p-1"
              >
                <div className="p-1 px-4 text-base">
                  <p>Cancel</p>
                </div>
              </button>
              <button
                type="submit"
                className="rounded-lg border-2 border-white/10 bg-violet-400/30 px-5 py-2 text-2xl text-white transition-all hover:scale-[1.05] hover:bg-violet-400/45 active:scale-100 md:p-1"
              >
                <div className="p-1 px-4 text-base">
                  <p>Save Changes</p>
                </div>
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
