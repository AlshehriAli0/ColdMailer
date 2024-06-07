"use client";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Totals } from "@/lib/types";

type props = {
  totals: Totals;
};

export default function TrackerStats({ totals }: props) {
  const [chartData, setChartData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    if (totals) {
      const monthlyData = Array(12).fill(0);

      for (const [month, count] of Object.entries(totals.monthlyEmails)) {
        const monthIndex = Number(month) - 1; (0-11)
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyData[monthIndex] = count;
        }
      }

      setChartData(monthlyData);
    }
  }, [totals]);

  return (
    <section className="mb-8 grid grid-rows-2 gap-4 text-violet-300 md:w-[95%]">
      <section className="flex gap-4">
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-6">
            <h4 className="text-lg font-bold">Accepted Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <p className="mt-6 text-2xl text-green-500">
                {totals?.acceptedCount}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                ({totals.acceptedPercentage})
              </p>
            </span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-6">
            <h4 className="text-lg font-bold">Rejected Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <p className="mt-6 text-2xl text-red-500">
                {totals?.rejectedCount}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                ({totals.rejectedPercentage})
              </p>
            </span>
          </div>
        </div>
      </section>
      <div className="flex h-[18rem] flex-col rounded-xl border border-white/10 bg-white p-6">
        <h4 className="text-lg font-bold">Sent Emails</h4>
        <p className="text-violet-200/40">All Time</p>

        <LineChart
          colors={["white"]}
          xAxis={[
            {
              dataKey: "x",
              label: "Month",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
          ]}
          series={[
            {
              data: chartData,
              label: "Total Emails",
              color: "#007bff",
            },
          ]}
          className="h-[200px] w-full bg-white text-white"
        />
      </div>
    </section>
  );
}
