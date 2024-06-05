import { verify } from "@/utils/verify";
import { validateEmail } from "@/utils/helpers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function saveUser() {
  const { email, name, id } = await verify();
  if (!email || !name || !id) {
    console.error("Missing user data");
    return;
  }

  if (validateEmail(email)) {
    try {
      const User = await db.query.users.findFirst({
        where: eq(users.email_address, email),
      });

      if (!User) {
        await db.insert(users).values({
          email_address: email,
          first_name: name,
          id,
        });
        console.log("User saved successfully");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  return;
}
