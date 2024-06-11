"use client";

import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import AddModule from "./add-module";

export default function AddRecipient() {
  const [add, setAdd] = React.useState(false);

  function onClick() {
    setAdd(!add);
  }
  function helpClose() {
    setAdd(false);
  }
  return (
    <section className="my-6">
      <button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white/15 text-lg font-semibold text-violet-300"
        onClick={onClick}
      >
        Add Recipient
        <span className="text-3xl">
          <CiSquarePlus />
        </span>
      </button>
      {add ? <AddModule close={helpClose} /> : null}
    </section>
  );
}
