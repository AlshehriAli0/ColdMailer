"use server";

import { z } from "zod";
import { type Recipient } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { as } from "node_modules/@upstash/redis/zmscore-d1ec861c";

const prisma = new PrismaClient();

const statusTypeSchema = z.union([
  z.literal("accepted"),
  z.literal("pending"),
  z.literal("rejected"),
]);

export const updateRecipient = async (
  originalRecipient: Recipient,
  formData: FormData,
) => {
  try {
    const schema = z.object({
      emailAddress: z.string().email(),
      name: z.string().optional(),
      status: statusTypeSchema,
      sentAt: z.string(),
    });

    const updatedRecipient = schema.parse(Object.fromEntries(formData));

    const result = schema.safeParse(updatedRecipient);

    if (!result.success) {
      return result.error.issues;
    }

    const { emailAddress, name, status, sentAt } = result.data;

    const date = new Date(sentAt);
    date.setHours(0, 0, 0, 0);
    const isoDateTime = date.toISOString();

    await prisma.recipient.update({
      where: {
        id: originalRecipient.id,
      },
      data: {
        emailAddress,
        name,
        status,
        sentAt: isoDateTime,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export default updateRecipient;
