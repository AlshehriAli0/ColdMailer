"use client";

import React from "react";

import { FaSort } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { sortState } from "@/context/recoilContextProvider";

export default function GridButtons() {
  const setSortType = useSetRecoilState(sortState);

  return (
    <div
      className="sticky top-0 z-10 ml-1 grid grid-cols-5 border-b border-white/10 bg-slate-950 md:w-[95%] md:px-12"
      style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.4fr" }}
    >
      <div className="flex py-2">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:bg-white/10 hover:text-violet-300 md:text-lg"
          onClick={() => setSortType("email")}
        >
          <span className="text-base md:text-lg">Email</span>
          <FaSort />
        </button>
      </div>
      <div className="flex py-2">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:bg-white/10 hover:text-violet-300 md:text-lg"
          onClick={() => setSortType("name")}
        >
          <span className="text-base md:text-lg">Name</span>
          <FaSort />
        </button>
      </div>
      <div className="flex py-2 ">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:bg-white/10 hover:text-violet-300 md:text-lg"
          onClick={() => setSortType("status")}
        >
          <span className="text-base md:text-lg">Status</span>
          <FaSort />
        </button>
      </div>
      <div className="flex py-2 ">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:bg-white/10 hover:text-violet-300 md:text-lg"
          onClick={() => setSortType("sentAt")}
        >
          <span className="text-base md:text-lg">Sent</span>
          <FaSort />
        </button>
      </div>
    </div>
  );
}
