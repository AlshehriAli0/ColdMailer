import type { Recipient } from "@/lib/types";
import { verify } from "@/utils/verify";
import { db } from "./db";

const prisma = db;

async function getRecipientsFromDB(token: string): Promise<Recipient[]> {
  const userID = (await prisma.user.findFirst({ where: { token } }))?.id;

  const user = await prisma.user.findFirst({
    where: { id: userID },
    include: { recipients: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const recipients = user.recipients;
  return recipients as Recipient[];
}

async function fetchData() {
  try {
    const { token } = (await verify()) as { token: string };
    if (!token) {
      throw new Error("No token found");
    }

    const recipients = await getRecipientsFromDB(token);
    return recipients;
  } catch (error) {
    console.error("Error fetching recipients:", error);
    throw error;
  }
}

export default fetchData;
