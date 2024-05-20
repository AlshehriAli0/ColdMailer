"use client";
import { editRecipient } from "@/context/recoilContextProvider";
import { type Recipient } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export default function EditRecipient() {
  const [editedRecipient, setEditedRecipient] = useRecoilState(editRecipient);
  const [originalRecipient, setOriginalRecipient] = useState<Recipient | null>(
    null,
  );

  useEffect(() => {
    if (editedRecipient) {
      setOriginalRecipient({ ...editedRecipient });
    }
  }, [editedRecipient]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateEditedRecipient((prevRecipient) => {
      if (!prevRecipient) return null;
      return { ...prevRecipient, [name]: value };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEditedRecipient((prevRecipient) => {
      if (!prevRecipient) return null;
      return { ...prevRecipient, [name]: value };
    });
  };


  const updateEditedRecipient = (
    updateFn: (prevRecipient: Recipient | null) => Recipient | null,
  ) => {
    setEditedRecipient((prevRecipient) => {
      const updatedRecipient = updateFn(prevRecipient);
      return updatedRecipient ? updatedRecipient : prevRecipient;
    });
  };

  const handleSave = () => {
    if (editedRecipient === null) {
      return;
    }

    if (
      originalRecipient &&
      hasRecipientChanged(originalRecipient, editedRecipient)
    ) {
      toast.success("Recipient updated successfully", {
        className: "bg-slate-900/90 text-violet-100 text-base border-white/10",
      });
    } else {
      toast.info("No changes were made", {
        className: "bg-slate-900/90 text-violet-100 text-base border-white/10",
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
  return (
    <React.Fragment>
      <input
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        type="text"
        name="emailAddress"
        value={editedRecipient.emailAddress}
        onChange={handleInputChange}
        required
      />
      <input
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        type="text"
        name="name"
        value={editedRecipient.name}
        onChange={handleInputChange}
      />
      <select
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        name="status"
        value={editedRecipient.status}
        onChange={handleSelectChange}
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
          value={sentAtDate?.toISOString().split("T")[0] ?? ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleSave}
          className="rounded p-1 text-2xl text-violet-200 transition hover:bg-white/5"
        >
          <IoMdSave />
        </button>
        <button
          onClick={handleCancel}
          className="rounded p-1 text-2xl text-violet-200 transition hover:bg-white/5"
        >
          <MdOutlineCancel />
        </button>
      </div>
    </React.Fragment>
  );
}
