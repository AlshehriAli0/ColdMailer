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
// import { LineChart } from "@mui/x-charts/LineChart";

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

  const [chartData, setChartData] = useState<number[][]>([]);

  useEffect(() => {
    const calculatePercentages = () => {
      const getPercentage = (count: number, total: number) => {
        return total > 0 ? ((count / total) * 100).toFixed(2) : "0.00";
      };

      setPercentages({
        pending: getPercentage(totalPending, totalEmails),
        accepted: getPercentage(totalAccepted, totalEmails),
        rejected: getPercentage(totalRejected, totalEmails),
      });

      setIsLoading(false);
    };

    const generateChartData = () => {
      const data = [];
      for (let i = 1; i <= 12; i++) {
        data.push([totalEmails]);
      }
      setChartData(data);
    };

    calculatePercentages();
    generateChartData();
  }, [totalEmails, totalPending, totalAccepted, totalRejected]);

  if (isLoading) {
    return <StatsSkeleton />;
  }

  return (
    <section className="mb-8 grid grid-rows-2 gap-4 text-violet-300 md:w-[95%] ">
      <div className="flex-1 rounded-xl border border-white/10">
        {/* <LineChart
          xAxis={[
            {
              dataKey: "x",
              label: "Month",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
          ]}
          series={[{ data: chartData }]}
          className="h-[300px] w-full bg-white text-white"
        /> */}
      </div>

      <section className="flex gap-4">
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
    </section>
  );
});

export default TrackerStats;
