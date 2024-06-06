"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { recipients } from "@/db/schema";
import { eq } from "drizzle-orm";

const statusTypeSchema = z.union([
  z.literal("accepted"),
  z.literal("pending"),
  z.literal("rejected"),
]);

export const updateRecipient = createServerAction()
  .input(
    z.object({
      id: z.number(),
      email_address: z.string().email(),
      name: z.string().optional(),
      status: statusTypeSchema,
      sentAt: z.string(),
      note: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const { id, email_address, name, status, sentAt, note } = input;

    const date = new Date(sentAt);
    date.setHours(0, 0, 0, 0);
    const isoDateTime = date.toISOString();
    try {
      await db
        .update(recipients)
        .set({
          email_address: email_address,
          name,
          status,
          sent_at: isoDateTime,
          note,
        })
        .where(eq(recipients.id, id));

      revalidatePath("/dashboard/tracker");
      return { data: true };
    } catch (error) {
      console.error("Error updating recipient:", error);
      return {
        data: false,
        error: "Too many requests, please try again later",
      };
    }
  });

export default updateRecipient;
