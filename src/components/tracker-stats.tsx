"use client";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Totals } from "@/lib/types";

type props = {
  totals: Totals;
};

export default function TrackerStats({ totals }: props) {
  return (
    <section className="mb-6 grid grid-rows-2 gap-4 text-violet-300 md:w-[95%]">
      <section className="flex h-fit gap-4">
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-5">
            <h4 className="text-lg font-bold">Accepted Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <p className="mt-6 text-2xl text-green-500">
                {totals?.acceptedCount}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                ({totals.acceptedPercentage}%)
              </p>
            </span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/10">
          <div className="p-5">
            <h4 className="text-lg font-bold">Rejected Status</h4>
            <p className="text-violet-200/40">Total</p>
            <span className="flex items-center">
              <p className="mt-6 text-2xl text-red-500">
                {totals?.rejectedCount}
              </p>
              <p className="text-md ml-3 mt-6 text-violet-200/25">
                ({totals.rejectedPercentage}%)
              </p>
            </span>
          </div>
        </div>
      </section>
      <div className="-mt-[4.4rem] flex h-[20rem] flex-col rounded-xl border border-white/10 p-5 md:-mt-[5.3rem]">
        <h4 className="text-lg font-bold">Sent Emails</h4>
        <p className="text-violet-200/40">This Year</p>
        <LineChart
          sx={{
            "& tspan": {
              fill: "#FFFFFF",
              color: "#FFFFFF",
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.4",
              fill: "#FFFFFF",
            },
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              fontFamily: "Roboto",
            },
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.5",
              fill: "#FFFFFF",
            },
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "#FFFFFF",
              strokeWidth: 0.4,
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "#FFFFFF",
              strokeWidth: 0.4,
            },
          }}
          yAxis={[
            {
              dataKey: "y",
              label: "Emails",
              data: totals.monthlyEmails,
            },
          ]}
          xAxis={[
            {
              dataKey: "x",
              label: "Month",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              tickNumber: 12,
            },
          ]}
          series={[
            {
              data: totals.monthlyEmails,
              label: "Total Emails",
              color: "#3b364c",
              type: "line",
              area: true,
            },
          ]}
          className="h-[200px] w-full bg-white text-white"
        />
      </div>
    </section>
  );
}
