import { type Recipient } from "@/lib/types";
import { verify } from "@/utils/verify";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const prisma = new PrismaClient();

async function getRecipientsFromDB(token: string): Promise<Recipient[]> {
  await prisma.$connect();
  const userID = (await prisma.user.findFirst({ where: { token } }))?.id;

  const user = await prisma.user.findFirst({
    where: { id: userID },
    include: { recipients: true },
  });

  if (!user) {
    await prisma.$disconnect();
    throw new Error("User not found");
  }

  const recipients = user.recipients;
  await prisma.$disconnect();
  return recipients as Recipient[];
}

const fetchData = cache(async () => {
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
});

export default fetchData;
