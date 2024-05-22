"use server";

import { z } from "zod";
import { type Recipient } from "@/lib/types";
import { PrismaClient } from "@prisma/client";

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

    const originalRecord = await prisma.recipient.findUnique({
      where: {
        id: originalRecipient.id,
        emailAddress: originalRecipient.emailAddress,
        name: originalRecipient.name,
        sentAt: originalRecipient.sentAt,
      },
    });

    if (!originalRecord) {
      return false;
    }

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
    console.log(error);
    return false;
  }
};

export default updateRecipient;
