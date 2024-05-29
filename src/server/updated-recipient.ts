"use server";

import { z } from "zod";
import type { Recipient } from "@/lib/types";
import { db } from "./db";

const prisma = db;

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
        email_address: emailAddress,
        name,
        status,
        sent_at: isoDateTime,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export default updateRecipient;
