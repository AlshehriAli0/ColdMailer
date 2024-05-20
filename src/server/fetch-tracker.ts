import { type Recipient } from "@/lib/types";
import { verify } from "@/utils/verify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// * Fetches the recipients for the current user
async function fetchData() {
  try {
    await prisma.$connect();
    const { token } = (await verify()) as { token: string };
    if (!token) {
      throw new Error("No token found");
    }

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
  } catch (error) {
    console.error("Error fetching recipients:", error);
    await prisma.$disconnect();
    throw error;
  }
}

export default fetchData;
