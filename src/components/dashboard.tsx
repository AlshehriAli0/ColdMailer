import fetchData from "@/server/fetch-recipient-data";
import React from "react";
import GridButtons from "./grid-buttons";
import RecipientList from "./recipient-list";
import TrackerStats from "./tracker-stats";

export default async function Dashboard() {
  const { recipients, totals } = await fetchData();

  return (
    <main>
      <TrackerStats totals={totals} />
      <GridButtons />
      <RecipientList initialRecipients={recipients} />
    </main>
  );
}
