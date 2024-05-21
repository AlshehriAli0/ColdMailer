"use client";
import { editRecipient } from "@/context/recoilContextProvider";
import { type Recipient } from "@/lib/types";
import updateRecipient from "@/server/updated-recipient";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface EditRecipientProps {
  initialPosition: { x: number; y: number };
}

export default function EditRecipient({ initialPosition }: EditRecipientProps) {
  const [editedRecipient, setEditedRecipient] = useRecoilState(editRecipient);
  const [originalRecipient, setOriginalRecipient] = useState<Recipient | null>(
    null,
  );

  useEffect(() => {
    if (editedRecipient && !originalRecipient) {
      setOriginalRecipient({ ...editedRecipient });
    }
  }, [editedRecipient, originalRecipient]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEditedRecipient((prevRecipient) => {
  //     if (!prevRecipient) return null;
  //     return { ...prevRecipient, [name]: value };
  //   });
  // };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setEditedRecipient((prevRecipient) => {
  //     if (!prevRecipient) return null;
  //     return { ...prevRecipient, [name]: value };
  //   });
  // };

  const handleSave = async () => {
    if (editedRecipient === null) {
      return;
    }

    if (
      originalRecipient &&
      hasRecipientChanged(originalRecipient, editedRecipient)
    ) {
      toast.loading("Saving changes...", {
        className: "bg-slate-900/95 text-violet-100 text-base border-white/10",
      });

      toast.success("Recipient updated successfully", {
        className: "bg-slate-900/95 text-violet-100 text-base border-white/10",
      });
    } else {
      toast.info("No changes were made", {
        className: "bg-slate-900/95 text-violet-100 text-base border-white/10",
      });
    }
  };

  const hasRecipientChanged = (original: Recipient, edited: Recipient) => {
    return (
      original.emailAddress !== edited.emailAddress ||
      original.name !== edited.name ||
      original.status !== edited.status ||
      original.sentAt !== edited.sentAt
    );
  };

  const handleCancel = () => {
    setTimeout(() => {
      setEditedRecipient(null);
    }, 800);
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
      y: isAbove ? initialPosition.y * -0.3 : initialPosition.y * 0.3,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8 },
      scale: 1,
    },
    // exit: {
    //   opacity: 0,
    //   y: isAbove ? initialPosition.y * -0.2 : initialPosition.y * 0.2,
    //   transition: { duration: 0.5 },
    //   scale: 0.8,
    // },
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-lg">
      <motion.form
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 left-[5%] top-[50%] z-[99] grid h-14 w-[90%] items-center gap-4 rounded border border-white/5 bg-white/[0.08] px-12 shadow-2xl"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.3fr" }}
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget as HTMLFormElement);

          if (!originalRecipient) return;

          await updateRecipient(originalRecipient, formData);
        }}
      >
        <input
          className=" h-[65%] rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
          type="text"
          name="emailAddress"
          placeholder={editedRecipient.emailAddress}
          required
        />

        <input
          className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
          type="text"
          name="name"
          placeholder={editedRecipient.name}
        />
        <select
          className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
          name="status"
          required
        >
          <option className="p-2 font-bold text-violet-800" value="accepted">
            accepted
          </option>
          <option className="p-2 font-bold text-violet-800" value="pending">
            pending
          </option>
          <option className="p-2 font-bold text-violet-800" value="rejected">
            rejected
          </option>
        </select>
        <div className="flex items-center gap-2">
          <input
            className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
            type="date"
            name="sentAt"
            placeholder={sentAtDate?.toISOString().split("T")[0] ?? ""}
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
  );
}
