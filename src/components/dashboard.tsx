import fetchData from "@/server/fetch-recipient-data";
import React from "react";
import GridButtons from "./grid-buttons";
import RecipientList from "./recipient-list";
import TrackerStats from "./tracker-stats";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default async function Dashboard() {
  const { recipients, totals } = await fetchData();

  return (
    <main>
      <TrackerStats totals={totals} />
      <p className="text-sm text-violet-400/30 flex items-center gap-2 md:hidden 4">
      <span className="text-lg">

        <IoMdInformationCircleOutline />
      </span>
        Edit details by clicking on the wanted recipient.
      </p>
      <GridButtons />
      <RecipientList initialRecipients={recipients} />
    </main>
  );
}
