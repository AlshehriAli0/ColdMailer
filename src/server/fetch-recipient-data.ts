import type { Recipient } from "@/lib/types";
import { verify } from "@/utils/verify";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

async function getRecipientsFromDB(id: string): Promise<Recipient[]> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      recipients: true,
    },
  });

  if (!user) {
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
    return recipients;
  } catch (error) {
    console.error("Error fetching recipients:", error);
    throw error;
  }
}

export default fetchData;
