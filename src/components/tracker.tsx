import React from "react";
import fetchData from "@/server/fetch-recipient-data";
import RecipientList from "@/components/recipient-list";

export default async function Tracker() {
  const recipients = await fetchData();

  return <RecipientList initialRecipients={recipients} />;
}
