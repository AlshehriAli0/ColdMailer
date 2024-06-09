import React, { Suspense, lazy } from "react";

import GridButtons from "@/components/grid-buttons";
import Skeleton from "@/components/suspense/grid-skeleton";
import StatsSkeleton from "@/components/suspense/stats-skeleton";

const TrackerDashboard = lazy(() => import("@/components/dashboard"));

export default async function TrackerHome() {
  return (
    <section className="no-scrollbar mx-4 mb-12 flex flex-col overflow-y-auto md:mb-2 md:ml-[17rem] md:mt-[5rem] md:max-h-[84vh] md:max-w-[79.7%] 2xl:w-[84%] min-h-screen">
      <div className="mb-12 mt-[3rem] flex flex-col">
        <h1 className="text-3xl font-semibold text-violet-100">
          Track All Sent Emails 📩
        </h1>
        <h2 className="text-violet-400/50">
          You can view, edit, add, delete all sent emails with ease!
        </h2>
      </div>
      <div>
        <Suspense
          fallback={
            <React.Fragment>
              <StatsSkeleton />
              <GridButtons />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </React.Fragment>
          }
        >
          <TrackerDashboard />
          <div className="pointer-events-none fixed bottom-0 h-20 w-full bg-gradient-to-t from-slate-950/95 to-transparent"></div>
        </Suspense>
      </div>
    </section>
  );
}
