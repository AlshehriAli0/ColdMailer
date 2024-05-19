"use client";

import React from "react";

import { FaSort } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { sortState } from "@/context/recoilContextProvider";

export default function GridButtons() {
  const setSortType = useSetRecoilState(sortState);

  return (
    <div
      className="sticky top-0 z-10 grid w-[95%] grid-cols-5 bg-slate-950 gap-4 border-b border-white/10 px-12"
      style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.1fr" }}
    >
      <div className="flex py-2">
        <div className="text-md flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-violet-400 transition hover:text-violet-300">
          <span className="text-lg">Email</span>
        </div>
      </div>
      <div className="flex py-2">
        <button
          className="text-md flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-violet-400 transition hover:bg-white/10 hover:text-violet-300"
          onClick={() => setSortType("name")}
        >
          <span className="text-lg">Name</span>
          <FaSort />
        </button>
      </div>
      <div className="flex py-2 ">
        <button
          className="text-md flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-violet-400 transition hover:bg-white/10 hover:text-violet-300"
          onClick={() => setSortType("status")}
        >
          <span className="text-lg">Status</span>
          <FaSort />
        </button>
      </div>
      <div className="flex py-2 ">
        <button
          className="flex items-center gap-2 rounded-md py-2 pl-1 pr-3 text-base text-violet-400 transition hover:bg-white/10 hover:text-violet-300"
          onClick={() => setSortType("sentAt")}
        >
          <span className="text-lg">Sent at</span>
          <FaSort />
        </button>
      </div>
    </div>
  );
}
