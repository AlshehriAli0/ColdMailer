import type { Recipient } from "@/lib/types";
import clsx from "clsx";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

export default function RecipientRow({
  recipient,
  handleEditClick,
}: {
  recipient: Recipient;
  handleEditClick: (recipient: Recipient) => void;
}) {
  return (
    <React.Fragment>
      <p className="no-scrollbar mx-auto flex w-[5rem] items-center overflow-x-auto whitespace-nowrap text-xs sm:text-sm md:mx-0 md:w-full md:min-w-fit md:text-base">
        {recipient.email_address}
      </p>
      <p className="no-scrollbar mx-auto flex w-16 items-center overflow-x-auto whitespace-nowrap text-xs sm:text-sm md:mx-0 md:ml-2 md:w-full md:text-base">
        {recipient.name}
      </p>
      <p className="mx-auto flex items-center text-xs sm:text-sm md:mx-0 md:text-base">
        <span
          className={clsx(
            recipient.status === "accepted" ? "text-green-600/90" : "",
            recipient.status === "pending" ? "text-gray-600/90" : "",
            recipient.status === "rejected" ? "text-red-600/90" : "",
            "mr-1 items-center justify-center text-xs",
          )}
        >
          <GoDotFill />
        </span>
        {recipient.status.charAt(0).toUpperCase() + recipient.status.slice(1)}
      </p>
      <p className="mx-auto flex items-center text-xs sm:text-sm md:mx-0 md:text-base">
        {recipient.sent_at
          ? new Date(recipient.sent_at).toLocaleDateString()
          : ""}
      </p>
      <span className="mx-auto flex items-center text-xs sm:text-sm md:mx-0 md:text-base">
        <button
          onClick={() => handleEditClick(recipient)}
          className="-ml-2 flex h-8 w-8 items-center justify-center rounded text-violet-400 transition-all hover:scale-[1.17] hover:bg-white/5 hover:text-violet-200 active:scale-100 md:-ml-0 md:w-10"
        >
          <BsThreeDots />
        </button>
      </span>
    </React.Fragment>
  );
}
