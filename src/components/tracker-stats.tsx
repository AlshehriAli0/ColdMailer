"use client";
import React, { useState } from "react";
import StatsSkeleton from "@/components/suspense/stats-skeleton";
import { LineChart } from "@mui/x-charts/LineChart";
import { Totals } from "@/lib/types";

type props = {
  totals:Totals ;
}


export default function TrackerStats( { totals } : props  ) {
  // const totalEmails = useRecoilValue(Totals);



  // const [percentages, setPercentages] = useState({
  //   accepted: totalEmails?.acceptedPercentage,
  //   rejected: totalEmails?.rejectedPercentage,
  // });

  const [chartData, setChartData] = useState<{ x: number[]; values: number[] }>(
    {
      x: [],
      values: [],
    },
  );


  // if (totalEmails) {
  //   const x: number[] = [];
  //   const values: number[] = [];

  //   for (const [month, count] of Object.entries(totalEmails.monthlyEmails)) {
  //     x.push(Number(month));
  //     values.push(count);
  //   }

  //   setChartData({ x, values });
  // }
  // setLoading(false);
  // if (loading) {
  //   return <StatsSkeleton />;
  // }

  return (
    <section className="mb-8 grid grid-rows-2 gap-4 text-violet-300 md:w-[95%]">
      <section className="flex gap-4">
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-6">
            <h4 className="text-lg font-bold">Accepted Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <p className="mt-6 text-2xl text-green-500">
                {/* {totalEmails?.acceptedCount} */}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                {/* ({percentages.accepted}%) */}
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
                {/* {totalEmails?.rejectedCount} */}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                {/* ({percentages.rejected}%) */}
              </p>
            </span>
          </div>
        </div>
      </section>
      <div className="flex-1 rounded-xl border border-white/10">
        <LineChart
          xAxis={[
            {
              dataKey: "x",
              label: "Month",
              data: chartData.x,
            },
          ]}
          series={[
            {
              data: chartData.values,
              label: "Total Emails",
              color: "#007bff",
            },
          ]}
          className="h-[300px] w-full bg-white text-white"
        />
      </div>
    </section>
  );
}
