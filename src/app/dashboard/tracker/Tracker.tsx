import React, { Suspense } from "react";
import Skeleton from "@/components/suspense/grid-skeleton";
import TrackerGrid from "@/components/tracker-grid";
import GridButtons from "@/components/grid-buttons";

export default function Tracker() {
  return (
    <section className="no-scrollbar ml-[16.5rem] mt-[7.3rem] !h-[34.8rem] w-[79.7%] grow  overflow-y-auto 2xl:w-[84%]">
      <div className="mb-12 flex flex-col">
        <h1 className="text-3xl font-semibold text-violet-300">
          Track All Sent Emails 📩
        </h1>
        <h2 className="text-violet-600/50 ">
          You can view, edit, add, delete all sent emails with ease!
        </h2>
      </div>
      <div>
        <GridButtons />

        <Suspense
          fallback={
            <React.Fragment>
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
          <TrackerGrid />
        </Suspense>
      </div>
    </section>
  );
}
