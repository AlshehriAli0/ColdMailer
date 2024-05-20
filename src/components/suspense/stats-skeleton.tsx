import React from 'react'

export default function StatsSkeleton() {
  return (
    <section className="mb-8 grid w-[95%] grid-cols-4 gap-4 text-violet-300 ">
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Sent Emails</h4>
          <p className="text-violet-200/40">All Time</p>
          <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Pending Status</h4>
          <p className="text-violet-200/40">Total</p>
          <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Accepted Status</h4>
          <p className="text-violet-200/40">Total</p>
          <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Rejected Status</h4>
          <p className="text-violet-200/40">Total</p>
          <div className="mt-6 h-7 w-24 animate-pulse rounded bg-gray-300/10"></div>
        </div>
      </div>
    </section>
  );
}
