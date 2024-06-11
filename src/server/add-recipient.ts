"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { recipients } from "@/db/schema";
import { verify } from "@/utils/verify";

const statusTypeSchema = z.union([
  z.literal("accepted"),
  z.literal("pending"),
  z.literal("rejected"),
]);

export const addRecipient = createServerAction()
  .input(
    z.object({
      email_address: z.string().email(),
      name: z.string().optional(),
      status: statusTypeSchema,
      sent_at: z.date(),
      note: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const { email_address, name, status, sent_at, note } = input;
    const { id } = await verify();

    if (!id) {
      return {
        data: false,
        error: "Missing user id",
      };
    }

    try {
      await db.insert(recipients).values({
        email_address,
        name,
        status,
        user_id: id,
        sent_at,
        note,
      });
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

export default addRecipient;
