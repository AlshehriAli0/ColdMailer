import type { Recipient } from "@/lib/types";
import { verify } from "@/utils/verify";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { calculateMonthlyEmails } from "@/utils/helpers";

async function getRecipientsFromDB(id: string): Promise<Recipient[]> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      recipients: true,
    },
  });

  if (!user?.recipients) {
    return [];
  } else if (!user) {
    throw new Error("User not found");
  }

  return user.recipients as Recipient[];
}

async function fetchData() {
  try {
    const { id } = await verify();
    if (!id) {
      throw new Error("No token found");
    }

    const recipients = await getRecipientsFromDB(id);

    const totalRecipients = recipients.length;
    const acceptedCount = recipients.filter(
      (recipient) => recipient.status === "accepted",
    ).length;
    const rejectedCount = recipients.filter(
      (recipient) => recipient.status === "rejected",
    ).length;

    const acceptedPercentage = totalRecipients
      ? (acceptedCount / totalRecipients) * 100
      : 0;
    const rejectedPercentage = totalRecipients
      ? (rejectedCount / totalRecipients) * 100
      : 0;

    const monthlyEmails: number[] = calculateMonthlyEmails(recipients);

    return {
      recipients,
      totals: {
        totalRecipients,
        acceptedCount,
        rejectedCount,
        acceptedPercentage,
        rejectedPercentage,
        monthlyEmails,
      },
    };
  } catch (error) {
    console.error("Error fetching recipients:", error);
    throw error;
  }
}

export default fetchData;
