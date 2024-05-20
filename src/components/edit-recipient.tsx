import { type Recipient } from "@/lib/types";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import { IoMdSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";


interface Props {
  recipient: Recipient;
  setEditingRecipient: Dispatch<SetStateAction<Recipient | null>>;
}


export default function EditRecipient({
  recipient,
  setEditingRecipient,
}: Props) {
  const [editedRecipient, setEditedRecipient] = useState<Recipient>(recipient);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditedRecipient((prevRecipient) => ({
      ...prevRecipient,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditingRecipient(editedRecipient);
  };

  const handleCancel = () => {
    setEditingRecipient(null);
  };

  const sentAtDate =
    editedRecipient.sentAt instanceof Date
      ? editedRecipient.sentAt
      : new Date(editedRecipient.sentAt);

  return (
    <React.Fragment>
      <input
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        type="text"
        name="emailAddress"
        value={editedRecipient.emailAddress}
        onChange={handleChange}
      />
      <input
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        type="text"
        name="name"
        value={editedRecipient.name}
        onChange={handleChange}
      />
      <select
        className=" rounded border-none bg-transparent p-1 outline-none transition-all focus:outline-violet-200"
        name="status"
        value={editedRecipient.status}
        onChange={handleChange}
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
          value={sentAtDate.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-end gap-1">
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
