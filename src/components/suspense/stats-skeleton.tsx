import React from "react";

export default function StatsSkeleton() {
  return (
    <section className="mb-8 grid grid-rows-2 gap-4 text-violet-300 md:w-[95%]">
      <section className="flex h-fit gap-4">
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-5">
            <h4 className="text-lg font-bold">Accepted Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
            </span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-5">
            <h4 className="text-lg font-bold">Rejected Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
            </span>
          </div>
        </div>
      </section>
      <div className="-mt-[4.4rem] h-[20rem] flex-1 rounded-xl border border-white/10 p-5 md:-mt-[5.3rem]">
        <h4 className="text-lg font-bold">Sent Emails</h4>
        <p className="text-violet-200/40">This Year</p>
        <div className="flex h-[70%] mt-4 w-full animate-pulse gap-4 rounded bg-gray-300/10"></div>
      </div>
    </section>
  );
}
