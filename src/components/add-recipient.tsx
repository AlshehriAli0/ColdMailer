"use client";

import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import AddModule from "./add-module";

export default function AddRecipient() {
  const [add, setAdd] = useState(false);

  function onClick() {
    setAdd(!add);
  }
  function helpClose() {
    setAdd(false);
  }

  return (
    <section className="my-6 md:hidden">
      <button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white/10 text-lg font-semibold text-violet-300 transition-all active:scale-95"
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
