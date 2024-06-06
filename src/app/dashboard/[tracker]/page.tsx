import React, { Suspense, lazy } from "react";

import GridButtons from "@/components/grid-buttons";
import Skeleton from "@/components/suspense/grid-skeleton";
import TrackerStats from "@/components/tracker-stats";

const Tracker = lazy(() => import("@/components/tracker"));


export default function TrackerHome() {
  return (
    <section className="no-scrollbar mt-[9rem] md:mt-[5rem] flex md:max-h-[84vh] flex-col overflow-y-auto md:ml-[16.5rem] md:max-w-[79.7%] 2xl:w-[84%] mx-4">
      <div className="mb-12 flex flex-col mt-[3rem]">
        <h1 className="text-3xl font-semibold text-violet-100">
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
          <div className="fixed bottom-0 h-20 w-full bg-gradient-to-t from-slate-950/95 to-transparent pointer-events-none"></div>
        </Suspense>
      </div>
    </section>
  );
}
