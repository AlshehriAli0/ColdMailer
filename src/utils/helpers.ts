import { type Recipient } from "@/lib/types";

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export const sortRecipients = (recipients: Recipient[], sortBy: string) => {
  const sortedRecipients = [...recipients];
  if (sortBy === "email") {
    sortedRecipients.sort((a, b) =>
      a.email_address.localeCompare(b.email_address),
    );
  } else if (sortBy === "name") {
    sortedRecipients.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "status") {
    sortedRecipients.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortBy === "sentAt") {
    sortedRecipients.sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
    );
  }
  return sortedRecipients;
};
