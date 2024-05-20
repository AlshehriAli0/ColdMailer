"use client";

import React, { useEffect, useState, memo } from "react";
import { useRecoilValue } from "recoil";
import {
  TotalAccepted,
  TotalEmails,
  TotalPending,
  TotalRejected,
} from "@/context/recoilContextProvider";
import StatsSkeleton from "@/components/suspense/stats-skeleton";

const TrackerStats = memo(function TrackerStats() {
  const totalEmails = useRecoilValue(TotalEmails);
  const totalPending = useRecoilValue(TotalPending);
  const totalAccepted = useRecoilValue(TotalAccepted);
  const totalRejected = useRecoilValue(TotalRejected);

  const [isLoading, setIsLoading] = useState(true);
  const [percentages, setPercentages] = useState({
    pending: "0.00",
    accepted: "0.00",
    rejected: "0.00",
  });

  useEffect(() => {
    const calculatePercentages = () => {
      const getPercentage = (count: number) => {
        return totalEmails > 0
          ? ((count / totalEmails) * 100).toFixed(2)
          : "0.00";
      };

      setPercentages({
        pending: getPercentage(totalPending),
        accepted: getPercentage(totalAccepted),
        rejected: getPercentage(totalRejected),
      });

      setIsLoading(false);
    };

    calculatePercentages();
  }, [totalEmails, totalPending, totalAccepted, totalRejected]);

  if (isLoading) {
    return <StatsSkeleton />;
  }

  return (
    <section className="mb-8 grid w-[95%] grid-cols-4 gap-4 text-violet-300">
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Sent Emails</h4>
          <p className="text-violet-200/40">All Time</p>
          <p className="mt-6 text-2xl">{totalEmails}</p>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Pending Status</h4>
          <p className="text-violet-200/40">Total</p>
          <span className="flex items-center">
            <p className="mt-6 text-2xl text-gray-400">{totalPending}</p>
            <p className="text-md ml-2 mt-6 text-violet-200/25">
              ({percentages.pending}%)
            </p>
          </span>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Accepted Status</h4>
          <p className="text-violet-200/40">Total</p>
          <span className="flex items-center">
            <p className="mt-6 text-2xl text-green-500">{totalAccepted}</p>
            <p className="text-md ml-3 mt-6 text-violet-200/25">
              ({percentages.accepted}%)
            </p>
          </span>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-white/10">
        <div className="p-6">
          <h4 className="text-lg font-bold">Rejected Status</h4>
          <p className="text-violet-200/40">Total</p>
          <span className="flex items-center">
            <p className="mt-6 text-2xl text-red-500">{totalRejected}</p>
            <p className="text-md ml-3 mt-6 text-violet-200/25">
              ({percentages.rejected}%)
            </p>
          </span>
        </div>
      </div>
    </section>
  );
});

export default TrackerStats;
