"use client";

import React, { useState } from "react";

import { FaSort } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { sortState } from "@/context/recoilContextProvider";
import { CiSquarePlus } from "react-icons/ci";
import AddModule from "./add-module";

export default function GridButtons() {
  const setSortType = useSetRecoilState(sortState);
  const [add, setAdd] = useState(false);

  function onClick() {
    setAdd(!add);
  }
  function helpClose() {
    setAdd(false);
  }

  return (
    <div
      className="sticky top-0 z-10 grid w-full grid-cols-5 border-b border-white/10 bg-slate-950 md:mx-0 md:w-[95%] md:gap-4 md:px-12"
      style={{ gridTemplateColumns: "4fr 4fr 1fr 1fr 0.3fr" }}
    >
      {add ? <AddModule close={helpClose} /> : null}

      <div className="mx-auto flex scale-90 py-2 md:mx-0 md:scale-100">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:scale-105 hover:bg-white/10 hover:text-violet-300 active:scale-95 md:text-lg"
          onClick={() => setSortType("email")}
        >
          <span className="-mr-1 text-lg md:mr-0">Email</span>
          <FaSort />
        </button>
      </div>
      <div className="mx-auto flex w-fit scale-90 py-2 md:mx-0 md:scale-100">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:scale-105 hover:bg-white/10 hover:text-violet-300 active:scale-95 md:text-lg"
          onClick={() => setSortType("name")}
        >
          <span className="-mr-1 text-lg md:mr-0">Name</span>
          <FaSort />
        </button>
      </div>
      <div className="mx-auto flex scale-90 py-2 md:mx-0 md:scale-100">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:scale-105 hover:bg-white/10 hover:text-violet-300 active:scale-95 md:text-lg"
          onClick={() => setSortType("status")}
        >
          <span className="-mr-1 text-lg md:mr-0">Status</span>
          <FaSort />
        </button>
      </div>
      <div className="mx-auto flex scale-90 py-2 md:mx-0 md:scale-100">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:scale-105 hover:bg-white/10 hover:text-violet-300 active:scale-95 md:text-lg"
          onClick={() => setSortType("sentAt")}
        >
          <span className="-mr-1 text-lg md:mr-0">Sent</span>
          <FaSort />
        </button>
      </div>
      <div className="mx-12 hidden scale-90 py-2 text-3xl text-violet-400 md:mx-0 md:flex md:scale-100">
        <button
          className="rounded-lg px-2 transition-all hover:scale-110 hover:bg-white/10 hover:text-violet-300 active:scale-95"
          onClick={onClick}
        >
          <div className="group-">
            <CiSquarePlus />
          </div>
        </button>
      </div>
    </div>
  );
}
