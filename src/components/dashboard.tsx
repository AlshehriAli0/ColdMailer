import fetchData from "@/server/fetch-recipient-data";
import React from "react";
import GridButtons from "./grid-buttons";
import RecipientList from "./recipient-list";
import TrackerStats from "./tracker-stats";
import { IoMdInformationCircleOutline } from "react-icons/io";
import AddRecipient from "./add-recipient";

export default async function Dashboard() {
  const { recipients, totals } = await fetchData();

  return (
    <main>
      <TrackerStats totals={totals} />
      <AddRecipient />
      <p className=" flex items-center gap-2 text-sm text-violet-400/30 md:hidden">
        <span className="text-lg">
          <IoMdInformationCircleOutline />
        </span>
        Edit or Delete by clicking on the wanted recipient.
      </p>
      <GridButtons />
      <RecipientList initialRecipients={recipients} />
    </main>
  );
}
