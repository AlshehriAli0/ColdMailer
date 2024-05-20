import React, { Suspense, lazy } from "react";

import GridButtons from "@/components/grid-buttons";
import Skeleton from "@/components/suspense/grid-skeleton";
import TrackerStats from "@/components/tracker-stats";

const Tracker = lazy(() => import("@/components/tracker"));

export default function TrackerHome() {
  return (
    <section className="no-scrollbar ml-[16.5rem] mt-[9rem] flex h-screen max-w-[79.7%] grow flex-col overflow-y-auto 2xl:w-[84%]">
      <div className="mb-12 flex flex-col">
        <h1 className="text-3xl font-semibold text-violet-300">
          Track All Sent Emails 📩
        </h1>
        <h2 className="text-violet-600/50 ">
          You can view, edit, add, delete all sent emails with ease!
        </h2>
      </div>
      <div>
        <TrackerStats />
        <Suspense
          fallback={
            <React.Fragment>
              <GridButtons />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </React.Fragment>
          }
        >
          <GridButtons />
          <Tracker />
          <div className="sticky bottom-0 h-20 w-full bg-gradient-to-t from-slate-950/95 to-transparent"></div>
        </Suspense>
      </div>
    </section>
  );
}
